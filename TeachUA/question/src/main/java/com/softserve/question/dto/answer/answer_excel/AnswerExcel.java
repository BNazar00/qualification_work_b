package com.softserve.question.dto.answer.answer_excel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AnswerExcel {
    private String questionTitle;

    private String text;
    private String isCorrect;
    private int value;
}
