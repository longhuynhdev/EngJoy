package com.suika.englishlearning.model.dto.quiz;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuizRequestDto {
    private String title;
    private String shortDescription;
    private int duration;
    private int points;
    private LocalDateTime date;
    private List<String> categories;
    private List<String> difficulties;
}
