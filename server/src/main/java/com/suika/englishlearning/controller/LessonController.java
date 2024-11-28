package com.suika.englishlearning.controller;

import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.model.dto.lesson.LessonRequestDto;
import com.suika.englishlearning.model.dto.lesson.LessonResponseDto;
import com.suika.englishlearning.service.LessonService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lessons")
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }
    //TODO: Add filter by categories, difficulties
    @GetMapping
    public ResponseEntity<List<LessonResponseDto>> getLessons() {
        return new ResponseEntity<>(lessonService.getLessons(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonResponseDto> getLesson(@PathVariable Integer id) {
        try {
            return new ResponseEntity<>(lessonService.getLesson(id), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createLesson(@RequestBody LessonRequestDto requestDto, String userName) {
        try {
            return new ResponseEntity<>(lessonService.createLesson(requestDto, userName), HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLesson(@PathVariable Integer id, @RequestBody LessonRequestDto requestDto) {
        try {
            return new ResponseEntity<>(lessonService.updateLesson(id, requestDto), HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Integer id) {
        try {
            lessonService.deleteLesson(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
