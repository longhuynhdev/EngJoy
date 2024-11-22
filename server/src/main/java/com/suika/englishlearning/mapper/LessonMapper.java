package com.suika.englishlearning.mapper;

import com.suika.englishlearning.model.Lesson;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.lesson.LessonRequestDto;
import com.suika.englishlearning.model.dto.lesson.LessonResponseDto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class LessonMapper {
    public Lesson toEntity(LessonRequestDto dto, UserEntity author) {
        Lesson lesson = new Lesson();
        lesson.setTitle(dto.getTitle());
        lesson.setShortDescription(dto.getShortDescription());
        lesson.setBody(dto.getBody());
        lesson.setDate(dto.getDate());
        lesson.setAuthor(author);
        lesson.setCategories(dto.getCategories());
        lesson.setDifficulties(dto.getDifficulties());
        return lesson;
    }

    public LessonResponseDto toDto(Lesson entity) {
        LessonResponseDto dto = new LessonResponseDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setShortDescription(entity.getShortDescription());
        dto.setBody(entity.getBody());
        dto.setAuthor(entity.getAuthor().getName());
        dto.setDate(entity.getDate());
        dto.setCategories(entity.getCategories());
        dto.setDifficulties(entity.getDifficulties());
        return dto;
    }

    public List<LessonResponseDto> toDtoList(List<Lesson> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

   
}
