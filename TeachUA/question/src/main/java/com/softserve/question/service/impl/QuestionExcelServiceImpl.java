package com.softserve.question.service.impl;

import com.softserve.commons.constant.excel.ExcelColumn;
import com.softserve.commons.exception.BadRequestException;
import com.softserve.commons.service.ExcelUtil;
import com.softserve.question.constant.QuestionExcelColumn;
import com.softserve.question.dto.answer.answer_excel.AnswerExcel;
import com.softserve.question.dto.question.question_excel.ExcelQuestionParsingResponse;
import com.softserve.question.dto.question.question_excel.QuestionExcel;
import com.softserve.question.model.Answer;
import com.softserve.question.model.Question;
import com.softserve.question.repository.AnswerRepository;
import com.softserve.question.repository.QuestionRepository;
import com.softserve.question.service.QuestionExcelService;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class QuestionExcelServiceImpl implements QuestionExcelService {
    private static final String FILE_NOT_READ_EXCEPTION = "Неможливо прочитати Excel файл";
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final DataFormatter dataFormatter;
    private HashMap<ExcelColumn, Integer> indexes;
    private int count = 0;

    public QuestionExcelServiceImpl(AnswerRepository answerRepository, QuestionRepository questionRepository,
                                    DataFormatter dataFormatter) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.dataFormatter = dataFormatter;
    }

    @Override
    public ExcelQuestionParsingResponse parseExcel(MultipartFile multipartFile) {
        ExcelQuestionParsingResponse response = new ExcelQuestionParsingResponse();
        List<List<Cell>> rows = ExcelUtil.excelSheetToList(getSheetFromExcelFile(multipartFile));
        indexes = ExcelUtil.getColumnIndexes(rows.get(0), QuestionExcelColumn.values());
        response.getQuestionParsingMistakes().addAll(
                ExcelUtil.validateColumnsPresent(rows.get(0), QuestionExcelColumn.values(), indexes));
        if (response.getQuestionParsingMistakes().isEmpty()) {
            response.setQuestionsInfo(createQuestions(rows));
            response.setAnswersInfo(createAnswers(rows));
        }
        return response;
    }

    private Sheet getSheetFromExcelFile(MultipartFile multipartFile) {
        try (InputStream inputStream = multipartFile.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {
            return workbook.getSheetAt(0);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FILE_NOT_READ_EXCEPTION);
        }
    }

    private List<Cell> createCells(Row row) {
        List<Cell> rowCells = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Cell cell = row.createCell(i);
            rowCells.add(cell);
        }
        return rowCells;
    }

    private void setColumnsWidth(Sheet sheet) {
        sheet.setColumnWidth(0, 1000);
        sheet.setColumnWidth(1, 6000);
        sheet.setColumnWidth(2, 6000);
        sheet.setColumnWidth(3, 3000);
        sheet.setColumnWidth(4, 4000);
        sheet.setColumnWidth(5, 6000);
        sheet.setColumnWidth(6, 6000);
    }

    @Override
    public byte[] exportToExcel() {
        final ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int rowNumber = 0;
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet();
        setColumnsWidth(sheet);

        Row row = sheet.createRow(rowNumber);
        String[] header
                = {"з/п", "Назва", "Опис", "Тип", "Категорія", "Варіанти відповідей", "Правильна відповідь", "Оцінка"};

        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);

        for (int i = 0; i < header.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(header[i]);
            cell.setCellStyle(style);
            count++;
        }
        List<Question> questions = questionRepository.findAllQuestions();

        rowNumber++;
        for (int i = 0; i < questions.size(); i++) {
            row = sheet.createRow(rowNumber);
            List<Cell> cells = createCells(row);
            List<Answer> answers = answerRepository.findAllByQuestionId(questions.get(i).getId());
            Answer answer = answers.get(0);

            fillQuestionHeader(style, questions, i, cells, answer);

            answers.remove(answer);
            rowNumber++;

            rowNumber = fillQuestionAnswers(rowNumber, sheet, style, answers);

            rowNumber++;
        }

        try {
            workbook.write(byteArrayOutputStream);
            workbook.close();
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new BadRequestException();
        }
    }

    private int fillQuestionAnswers(int rowNumber, Sheet sheet, CellStyle style, List<Answer> answers) {
        for (Answer a : answers) {
            Row row = sheet.createRow(rowNumber);
            List<Cell> cells = createCells(row);

            for (Cell cell : cells) {
                if (cell.getColumnIndex() == 5) {
                    cell.setCellValue(a.getText());
                }
                if (cell.getColumnIndex() == 6) {
                    cell.setCellValue(a.isCorrect());
                }
                if (cell.getColumnIndex() == 7) {
                    cell.setCellStyle(style);
                    cell.setCellValue(a.getValue());
                }
            }
            rowNumber++;
        }
        return rowNumber;
    }

    private void fillQuestionHeader(CellStyle style, List<Question> questions, int i, List<Cell> cells, Answer answer) {
        for (Cell cell : cells) {
            switch (cell.getColumnIndex()) {
              case 0 -> {
                  cell.setCellStyle(style);
                  cell.setCellValue(i + 1d);
              }
              case 1 -> cell.setCellValue(questions.get(i).getTitle());
              case 2 -> cell.setCellValue(questions.get(i).getDescription());
              case 3 -> {
                  cell.setCellStyle(style);
                  cell.setCellValue(questions.get(i).getQuestionType().getTitle());
              }
              case 4 -> cell.setCellValue(questions.get(i).getQuestionCategory().getTitle());
              case 5 -> cell.setCellValue(answer.getText());
              case 6 -> cell.setCellValue(answer.isCorrect());
              default -> {
                  cell.setCellStyle(style);
                  cell.setCellValue(answer.getValue());
              }
            }
        }
    }

    @Override
    public List<QuestionExcel> createQuestions(List<List<Cell>> rows) {
        List<QuestionExcel> result = new ArrayList<>();
        rows.remove(0);
        for (List<Cell> row : rows) {
            if (row.size() > 3) {
                result.add(createQuestion(row));
            }
        }

        return result;
    }

    private QuestionExcel createQuestion(List<Cell> row) {
        String title = getFormattedCellString(row, QuestionExcelColumn.TITLE);
        String description = getFormattedCellString(row, QuestionExcelColumn.DESCRIPTION);
        String type = getFormattedCellString(row, QuestionExcelColumn.TYPE);
        String category = getFormattedCellString(row, QuestionExcelColumn.CATEGORY);

        return QuestionExcel.builder()
                .title(title)
                .description(description)
                .type(type)
                .category(category)
                .build();
    }

    private String getFormattedCellString(List<Cell> row, QuestionExcelColumn column) {
        return dataFormatter.formatCellValue(row.get(indexes.get(column))).trim();
    }

    @Override
    public List<AnswerExcel> createAnswers(List<List<Cell>> rows) {
        List<AnswerExcel> result = new ArrayList<>();
        String questionTitle = null;

        for (List<Cell> row : rows) {
            if (row.size() > 3) {
                questionTitle = String.valueOf(row.get(indexes.get(QuestionExcelColumn.TITLE)));
                result.add(createAnswer(questionTitle, row));
            } else {
                result.add(createAnswer(questionTitle, row));
            }
        }

        return result;
    }

    private AnswerExcel createAnswer(String title, List<Cell> row) {
        String questionTitle;
        String text;
        String isCorrect;
        int value;

        if (row.size() > 3) {
            questionTitle = getFormattedCellString(row, QuestionExcelColumn.TITLE);
            text = getFormattedCellString(row, QuestionExcelColumn.ANSWERS);
            isCorrect = getFormattedCellString(row, QuestionExcelColumn.CORRECT);
            value = Integer.parseInt(getFormattedCellString(row, QuestionExcelColumn.VALUE));
        } else {
            questionTitle = title;
            text = dataFormatter.formatCellValue(row.get(0)).trim();
            isCorrect = dataFormatter.formatCellValue(row.get(1)).trim();
            value = Integer.parseInt(dataFormatter.formatCellValue(row.get(2)).trim());
        }

        return AnswerExcel.builder()
                .questionTitle(questionTitle)
                .text(text)
                .isCorrect(isCorrect)
                .value(value)
                .build();
    }
}
