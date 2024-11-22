package com.suika.englishlearning.repository;

import com.suika.englishlearning.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
}
