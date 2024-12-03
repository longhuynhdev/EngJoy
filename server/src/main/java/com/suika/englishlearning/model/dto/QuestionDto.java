package com.suika.englishlearning.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    private int id;
    private String question;
    private List<AnswerDto> answers;
}
