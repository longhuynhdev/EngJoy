package com.suika.englishlearning.mapper;

import com.suika.englishlearning.model.Question;
import com.suika.englishlearning.model.dto.QuestionDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {
    public QuestionDto toDto(Question question) {
        QuestionDto questionDto = new QuestionDto();
        questionDto.setQuestion(question.getQuestion());
        questionDto.setAnswers(question.getAnswers());
        return questionDto;
    }

    public Question toEntity(QuestionDto questionDto) {
        Question question = new Question();
        question.setQuestion(questionDto.getQuestion());
        question.setAnswers(questionDto.getAnswers());
        return question;
    }
}
