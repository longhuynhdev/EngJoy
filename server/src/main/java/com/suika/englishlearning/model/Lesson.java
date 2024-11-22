package com.suika.englishlearning.model;

import java.time.LocalDateTime;
import java.util.List;

import com.suika.englishlearning.model.enums.Category;
import com.suika.englishlearning.model.enums.Difficulty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @Column(nullable = false)
    private LocalDateTime date;

    @ElementCollection
    @CollectionTable(name = "lesson_categories")
    @Enumerated(EnumType.STRING)
    private List<Category> categories;

    @ElementCollection
    @CollectionTable(name = "lesson_difficulties")
    @Enumerated(EnumType.STRING)
    private List<Difficulty> difficulties;
}
