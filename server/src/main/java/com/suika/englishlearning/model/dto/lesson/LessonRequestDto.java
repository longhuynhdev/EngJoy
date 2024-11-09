package com.suika.englishlearning.model.dto.lesson;

import com.suika.englishlearning.model.enums.Category;
import com.suika.englishlearning.model.enums.Difficulty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class LessonRequestDto {
    private String title;
    private String body;
    private LocalDateTime date;
    private List<Category> categories;
    private List<Difficulty> difficulties;
}
