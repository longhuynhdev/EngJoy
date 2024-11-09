package com.suika.englishlearning.model.dto.lesson;

import com.suika.englishlearning.model.enums.Category;
import com.suika.englishlearning.model.enums.Difficulty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class LessonResponseDto {
    private int id;
    private String title;
    private String body;
    private String author;
    private LocalDateTime date;
    private List<Category> categories;
    private List<Difficulty> difficulties;
}
