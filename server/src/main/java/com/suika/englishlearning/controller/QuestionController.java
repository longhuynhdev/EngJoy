package com.suika.englishlearning.controller;

import com.suika.englishlearning.model.Question;
import com.suika.englishlearning.model.dto.QuestionDto;
import com.suika.englishlearning.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestion();
    }

    @PostMapping
    public ResponseEntity<QuestionDto> createLesson(@RequestBody QuestionDto questionDto) {
        return new ResponseEntity<>(questionService.createLesson(questionDto), HttpStatus.CREATED);
    }

}
