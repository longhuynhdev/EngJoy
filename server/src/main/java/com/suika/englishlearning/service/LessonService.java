package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.LessonMapper;
import com.suika.englishlearning.model.Category;
import com.suika.englishlearning.model.Difficulty;
import com.suika.englishlearning.model.Lesson;
import com.suika.englishlearning.model.Question;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.lesson.LessonDetailsDto;
import com.suika.englishlearning.model.dto.lesson.LessonRequestDto;
import com.suika.englishlearning.model.dto.lesson.LessonResponseDto;
import com.suika.englishlearning.repository.CategoryRepository;
import com.suika.englishlearning.repository.DifficultyRepository;
import com.suika.englishlearning.repository.LessonRepository;
import com.suika.englishlearning.repository.QuestionRepository;
import com.suika.englishlearning.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final DifficultyRepository difficultyRepository;
    private final LessonMapper lessonMapper;
    private final QuestionRepository questionRepository;

    public LessonService(LessonRepository lessonRepository, UserRepository userRepository, LessonMapper lessonMapper,
            CategoryRepository categoryRepository, DifficultyRepository difficultyRepository,
            QuestionRepository questionRepository) {
        this.lessonRepository = lessonRepository;
        this.userRepository = userRepository;
        this.lessonMapper = lessonMapper;
        this.categoryRepository = categoryRepository;
        this.difficultyRepository = difficultyRepository;
        this.questionRepository = questionRepository;
    }

    public void assignQuestionsToLesson(Integer lessonId, List<Integer> questionIds) {
        if (questionIds == null || questionIds.isEmpty()) {
            throw new IllegalArgumentException("Question IDs list cannot be empty");
        }

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        List<Question> questions = new ArrayList<>();
        for (int questionId : questionIds) {
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
            questions.add(question);
        }

        lesson.setQuestions(questions);
        lessonRepository.save(lesson);
    }

    public LessonResponseDto createLesson(LessonRequestDto requestDto, String userName) {
        UserEntity author = userRepository.findByEmail(userName)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (requestDto.getDuration() < 0 || requestDto.getPoints() < 0) {
            throw new IllegalArgumentException("Duration and points must be non-negative");
        }

        Lesson lesson = lessonMapper.toEntity(requestDto, author);
        return lessonMapper.toDto(lessonRepository.save(lesson));
    }

    public LessonResponseDto updateLesson(Integer id, LessonRequestDto requestDto) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        if (requestDto.getTitle() != null && !requestDto.getTitle().isEmpty()) {
            lesson.setTitle(requestDto.getTitle());
        }
        if (requestDto.getShortDescription() != null && !requestDto.getShortDescription().isEmpty()) {
            lesson.setShortDescription(requestDto.getShortDescription());
        }
        if (requestDto.getDuration() != 0) {
            lesson.setDuration(requestDto.getDuration());
        }
        if (requestDto.getPoints() != 0) {
            lesson.setPoints(requestDto.getPoints());
        }
        if (requestDto.getBody() != null && !requestDto.getBody().isEmpty()) {
            lesson.setBody(requestDto.getBody());
        }
        if (requestDto.getDate() != null) {
            lesson.setDate(requestDto.getDate());
        }

        if (requestDto.getCategories() != null && !requestDto.getCategories().isEmpty()) {
            List<Category> categories = requestDto.getCategories().stream()
                    .map(name -> categoryRepository.findByName(name)
                            .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + name)))
                    .collect(Collectors.toList());
            lesson.setCategories(categories);
        }

        if (requestDto.getDifficulties() != null && !requestDto.getDifficulties().isEmpty()) {
            List<Difficulty> difficulties = requestDto.getDifficulties().stream()
                    .map(name -> difficultyRepository.findByName(name)
                            .orElseThrow(() -> new ResourceNotFoundException("Difficulty not found: " + name)))
                    .collect(Collectors.toList());
            lesson.setDifficulties(difficulties);
        }

        return lessonMapper.toDto(lessonRepository.save(lesson));
    }

    public List<LessonResponseDto> getLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
        List<LessonResponseDto> lessonResponseDtos = new ArrayList<>();
        for (Lesson lesson : lessons) {
            lessonResponseDtos.add(lessonMapper.toDto(lesson));
        }
        return lessonResponseDtos;
    }

    public LessonDetailsDto getLesson(Integer id) {
        return lessonMapper.toDtoDetails(lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found")));
    }

    public void deleteLesson(Integer id) {
        if (!lessonRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lesson not found");
        }
        lessonRepository.deleteById(id);
    }
}
