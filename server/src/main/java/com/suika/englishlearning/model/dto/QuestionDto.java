package com.suika.englishlearning.model.dto;

import com.suika.englishlearning.model.Answer;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    private String question;
    private List<Answer> answers;
}
