package com.suika.englishlearning.controller;

import com.suika.englishlearning.exception.DuplicateResourceException;
import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.QuestionMapper;
import com.suika.englishlearning.model.dto.quiz.QuizDetailsDto;
import com.suika.englishlearning.model.dto.quiz.QuizRequestDto;
import com.suika.englishlearning.model.dto.quiz.QuizResponseDto;
import com.suika.englishlearning.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/quiz")
public class QuizController {
    private final QuizService quizService;
    private final QuestionMapper questionMapper;

    public QuizController(QuizService quizService, QuestionMapper questionMapper) {
        this.quizService = quizService;
        this.questionMapper = questionMapper;
    }

    @GetMapping
    public ResponseEntity<List<QuizDetailsDto>> getQuizzes() {
        return new ResponseEntity<>(quizService.getQuizzes(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<QuizDetailsDto> getQuiz(@PathVariable("id") Integer id)
    {
        try {
            return new ResponseEntity<>(quizService.getQuizById(id), HttpStatus.OK);
        }
        catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<QuizResponseDto>> filterQuizzes(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) List<String> difficulties) {
        try {
            return new ResponseEntity<>(quizService.filterQuizzes(categories, difficulties), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/createQuiz")
    public ResponseEntity<?> createQuiz(@RequestBody QuizRequestDto quizRequestDto, String userName)
    {
        try {
            return new ResponseEntity<>(quizService.createQuiz(quizRequestDto, userName), HttpStatus.CREATED);
        }
        catch (ResourceNotFoundException | IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/updateQuiz/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable("id") Integer id, @RequestBody QuizRequestDto quizRequestDto)
    {
        try {
            return new ResponseEntity<>(quizService.updateQuiz(id, quizRequestDto), HttpStatus.OK);
        }
        catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}/assignQuestions")
    public ResponseEntity<?> assignQuestionsToQuiz(@PathVariable("id") Integer id, @RequestBody List<Integer> questionIds)
    {
        try {
            String message = quizService.assignQuestionsToQuiz(id, questionIds);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (DuplicateResourceException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping(path = "/{id}/getQuestions")
    public ResponseEntity<?> getQuestions(@PathVariable("id") Integer id)
    {
        try {
            return new ResponseEntity<>(quizService.getQuestions(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/deleteQuiz/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("id") Integer id)
    {
        try {
            String message = quizService.deleteQuiz(id);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
