package com.softserve.club.util;

import com.softserve.club.constant.ExcelErrorType;
import com.softserve.club.dto.database_transfer.ExcelFullParsingMistake;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;

/**
 * User this class for pars Excel data.
 *
 * @author Vitalii Hapon
 */
@Slf4j
public class ExcelRowParser {
    public static final String INCORRECT_COORDINATES_FORMAT_ERROR = "Неправильний формат координат";
    public static final String INCORRECT_COORDINATES_NUMERIC_FORMAT_ERROR =
            "Неможливо розпізнати числові значення координат";
    public static final String INCORRECT_NUMERIC_FORMAT_ERROR = "Очікується число";
    public static final String EMPTY_CELL_ERROR = "Пустка клітинка";
    public static final String UNNAMED_COLUMN_TITLE = "БЕЗІМЕННА КОЛОНКА";
    public static final String DEFAULT_CATEGORY_NAME = "Інше";

    private final List<ExcelFullParsingMistake> mistakes;
    private final XSSFRow row;
    private final XSSFSheet sheet;
    private boolean errorsFlag = false;

    public ExcelRowParser(List<ExcelFullParsingMistake> mistakes, XSSFRow row) {
        this.mistakes = mistakes;
        this.row = row;
        this.sheet = row.getSheet();
    }

    public boolean hasErrors() {
        return errorsFlag;
    }

    private String getColumnName(int column) {
        XSSFRow headerRow = sheet.getRow(0);
        if (headerRow != null) {
            XSSFCell cell = headerRow.getCell(column);
            if (cell != null) {
                if (cell.getCellType() == CellType.STRING) {
                    return cell.getStringCellValue();
                } else {
                    return cell.getRawValue();
                }
            }
        }
        return UNNAMED_COLUMN_TITLE;
    }

    public String getString(int column, ExcelErrorType errorType) {
        return getString(column, false, errorType);
    }

    public String getString(int column, boolean maybeEmpty, ExcelErrorType errorType) {
        XSSFCell cell = row.getCell(column);
        if (cell != null) {
            if (cell.getCellType() == CellType.STRING && !cell.getStringCellValue().isEmpty()) {
                String cellValue = cell.getStringCellValue();
                log.debug("Cell Type String, not empty, cell value =" + cellValue + " Column = " + column);
                return cellValue == null ? "" : cellValue;
            } else {
                String cellValue = cell.getRawValue();
                log.debug("Cell Type Not String, cell value =" + cellValue + " Column = " + column);
                return cellValue == null ? "" : cellValue;
            }
        } else if (mistakes != null && !maybeEmpty) {
            errorsFlag = true;
            mistakes.add(ExcelFullParsingMistake.builder().cellValue("").rowIndex((long) row.getRowNum() + 1)
                    .columnName(getColumnName(column)).errorDetails(EMPTY_CELL_ERROR)
                    .sheetName(sheet.getSheetName()).critical(errorType == ExcelErrorType.CRITICAL).build());
        }
        return "";
    }

    public boolean isColumnEmpty(int column) {
        XSSFCell cell = row.getCell(column);

        if (cell != null) {
            if (cell.getCellType() == CellType.STRING) {
                return cell.getStringCellValue().isEmpty();
            } else {
                if (cell.getRawValue() == null) {
                    return true;
                } else {
                    return cell.getRawValue().isEmpty();
                }
            }
        }
        return true;
    }

    public Double[] parseCoordinates(int column) {
        return parseCoordinates(column, false);
    }

    public Double[] parseCoordinates(int column, boolean maybeEmpty) {
        String coordinates = getString(column, maybeEmpty, ExcelErrorType.CRITICAL);

        if (!coordinates.isEmpty()) {
            String[] coordinateStrings = coordinates.split(",");
            if (coordinateStrings.length != 2 || coordinateStrings[0].isEmpty() || coordinateStrings[1].isEmpty()) {
                errorsFlag = true;
                mistakes.add(ExcelFullParsingMistake.builder()
                        .cellValue(coordinates).rowIndex((long) row.getRowNum() + 1)
                        .columnName(getColumnName(column)).errorDetails(INCORRECT_COORDINATES_FORMAT_ERROR)
                        .sheetName(sheet.getSheetName()).critical(true).build());
            } else {
                try {
                    double longitude = Double.parseDouble(coordinateStrings[0]);
                    double latitude = Double.parseDouble(coordinateStrings[1]);
                    return new Double[] {latitude, longitude};
                } catch (NumberFormatException e) {
                    errorsFlag = true;
                    mistakes.add(ExcelFullParsingMistake.builder().cellValue(coordinates)
                            .rowIndex((long) row.getRowNum() + 1).columnName(getColumnName(column))
                            .errorDetails(INCORRECT_COORDINATES_NUMERIC_FORMAT_ERROR).sheetName(sheet.getSheetName())
                            .critical(true).build());
                }
            }
        }
        return new Double[] {null, null};
    }

    public List<String> parseCategories(int column, boolean maybeEmpty) {
        List<String> result = new ArrayList<>();

        String categories = getString(column, maybeEmpty, ExcelErrorType.CRITICAL);
        String[] categoriesArray = categories.split(",");
        for (String category : categoriesArray) {
            String categoryString = category.trim();
            if (!categoryString.isEmpty()) {
                result.add(category.trim());
            }
        }
        if (result.isEmpty()) {
            result.add(DEFAULT_CATEGORY_NAME);
        }
        return result;
    }

    public List<String> parseCategories(int column) {
        return parseCategories(column, false);
    }

    public Integer[] parseAges(int column) {
        return parseAges(column, false);
    }

    public Integer[] parseAges(int column, boolean maybeEmpty) {
        String ages = getString(column, maybeEmpty, ExcelErrorType.CRITICAL);

        if (!ages.isEmpty()) {
            // regEx that replace all word characters and space to nothing
            try {
                String formattedAges = ages.replaceAll("[a-zA-Z.,:' ]", "");
                String[] fromToAges = formattedAges.split("-");
                if (fromToAges.length < 2) {
                    return new Integer[] {null, null};
                }
                return new Integer[] {Integer.parseInt(fromToAges[0]), Integer.parseInt(fromToAges[1])};
            } catch (NumberFormatException e) {
                log.error(e.getMessage());
            }
        }
        return new Integer[] {null, null};
    }

    public Long getLong(int column, ExcelErrorType errorType) {
        String rowString = getString(column, errorType);
        if (!rowString.isEmpty()) {
            try {
                return Double.valueOf(rowString).longValue();
            } catch (NumberFormatException e) {
                errorsFlag = true;
                mistakes.add(ExcelFullParsingMistake.builder().cellValue(rowString).rowIndex((long) row.getRowNum() + 1)
                        .columnName(getColumnName(column)).errorDetails(INCORRECT_NUMERIC_FORMAT_ERROR)
                        .sheetName(sheet.getSheetName()).critical(true).build());
            }
        }
        return null;
    }
}
