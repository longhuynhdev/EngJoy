package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.DuplicateResourceException;
import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.QuestionMapper;
import com.suika.englishlearning.mapper.QuizMapper;
import com.suika.englishlearning.model.*;
import com.suika.englishlearning.model.dto.QuestionDto;
import com.suika.englishlearning.model.dto.quiz.QuizDetailsDto;
import com.suika.englishlearning.model.dto.quiz.QuizRequestDto;
import com.suika.englishlearning.model.dto.quiz.QuizResponseDto;
import com.suika.englishlearning.repository.*;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final DifficultyRepository difficultyRepository;
    private final QuestionRepository questionRepository;
    private final QuizMapper quizMapper;
    private final QuestionMapper questionMapper;

    private QuizService(QuizRepository quizRepository, UserRepository userRepository,
                        CategoryRepository categoryRepository, DifficultyRepository difficultyRepository,
                        QuizMapper lessonMapper, QuestionRepository questionRepository, QuizMapper quizMapper, QuestionMapper questionMapper)
    {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.difficultyRepository = difficultyRepository;
        this.questionRepository = questionRepository;
        this.quizMapper = quizMapper;
        this.questionMapper = questionMapper;
    }

    public List<QuizDetailsDto> getQuizzes()
    {
        List<Quiz> quizzes = quizRepository.findAll();
        List<QuizDetailsDto> quizDetailsDto = new ArrayList<>();
        for (Quiz quiz : quizzes)
        {
            quizDetailsDto.add(quizMapper.toDtoDetails(quiz));
        }
        return quizDetailsDto;
    }


    public QuizDetailsDto getQuizById(Integer id)
    {
        return quizMapper.toDtoDetails(quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found")));
    }

    public QuizResponseDto createQuiz(QuizRequestDto quizRequestDto, String userName)
    {
        UserEntity author = userRepository.findByEmail(userName)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (quizRequestDto.getDuration() <= 0 || quizRequestDto.getPoints() <= 0) {
            throw new IllegalArgumentException("Duration and points must be greater than 0");
        }

        Quiz quiz = quizMapper.toEntity(quizRequestDto, author);

        return quizMapper.toDto(quizRepository.save(quiz));
    }

    public QuizResponseDto updateQuiz(Integer id, QuizRequestDto quizRequestDto)
    {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        // Check request validity
        if (quizRequestDto.getTitle() == null || quizRequestDto.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty or null");
        }
        if (quizRequestDto.getDuration() <= 0 || quizRequestDto.getPoints() <= 0) {
            throw new IllegalArgumentException("Duration and points must be greater than 0");
        }

        quiz.setTitle(quizRequestDto.getTitle());

        if (quizRequestDto.getShortDescription() != null && !quizRequestDto.getShortDescription().isEmpty()) {
            quiz.setShortDescription(quizRequestDto.getShortDescription());
        }

        quiz.setDuration(quizRequestDto.getDuration());
        quiz.setPoints(quizRequestDto.getPoints());

        if (quizRequestDto.getDate() != null) {
            quiz.setDate(quizRequestDto.getDate());
        }

        if (quizRequestDto.getCategories() != null && !quizRequestDto.getCategories().isEmpty()) {
            List<Category> categories = quizRequestDto.getCategories().stream()
                    .map(name -> categoryRepository.findByName(name)
                            .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + name)))
                    .collect(Collectors.toList());
            quiz.setCategories(categories);
        }

        if (quizRequestDto.getDifficulties() != null && !quizRequestDto.getDifficulties().isEmpty()) {
            List<Difficulty> difficulties = quizRequestDto.getDifficulties().stream()
                    .map(name -> difficultyRepository.findByName(name)
                            .orElseThrow(() -> new ResourceNotFoundException("Difficulty not found: " + name)))
                    .collect(Collectors.toList());
            quiz.setDifficulties(difficulties);
        }

        return quizMapper.toDto(quizRepository.save(quiz));
    }

    public String deleteQuiz(Integer id)
    {
        if (!quizRepository.existsById(id))
        {
            throw new ResourceNotFoundException("Quiz not found");
        }
        quizRepository.deleteById(id);

        return "Quiz deleted";
    }

    public String assignQuestionsToQuiz(Integer id, List<Integer> questionIds)
    {
        if (questionIds == null || questionIds.isEmpty()) {
            throw new IllegalArgumentException("Question list cannot be empty");
        }

        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        List<Question> questions = quiz.getQuestions();

        for (Integer questionId : questionIds) {
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
            if (questions.contains(question))
            {
                throw new DuplicateResourceException("Question already assigned");
            }

            questions.add(question);
        }

        quiz.setQuestions(questions);
        quizRepository.save(quiz);

        return "Questions assigned";
    }

    public List<QuestionDto> getQuestions(Integer id)
    {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        List<Question> questions = quiz.getQuestions();

        return questionMapper.toDtoList(questions);
    }

    public List<QuizResponseDto> filterQuizzes(List<String> categories, List<String> difficulties)
    {
        // Validate categories
        if (categories != null && !categories.isEmpty()) {
            for (String category : categories) {
                if (!categoryRepository.existsByName(category))
                    throw new IllegalArgumentException("Category not existing: " + category);
            }
        }

        // Validate difficulties
        if (difficulties != null && !difficulties.isEmpty()) {
            for (String difficulty : difficulties) {
                if (!difficultyRepository.existsByName(difficulty)) {
                    throw new IllegalArgumentException("Difficulty not existing: " + difficulty);
                }
            }
        }

        List<Quiz> filteredQuizzes;

        if ((categories == null || categories.isEmpty()) && (difficulties == null || difficulties.isEmpty())) {
            // Return all quizzes if no filters are provided
            filteredQuizzes = quizRepository.findAll();

        } else if (categories != null && difficulties != null) {
            // Filter by both categories and difficulties
            filteredQuizzes = quizRepository.findByCategoriesAndDifficulties(categories, difficulties)
                    .stream()
                    .flatMap(Optional::stream) // Extract non-empty Optional values
                    .collect(Collectors.toList());

        } else if (categories != null) {
            // Filter by categories only
            filteredQuizzes = quizRepository.findByCategories(categories)
                    .stream()
                    .flatMap(Optional::stream) // Extract non-empty Optional values
                    .collect(Collectors.toList());

        } else {
            // Filter by difficulties only
            filteredQuizzes = quizRepository.findByDifficulties(difficulties)
                    .stream()
                    .flatMap(Optional::stream) // Extract non-empty Optional values
                    .collect(Collectors.toList());
        }

        // Map quizzes to DTOs
        return filteredQuizzes.stream()
                .map(quizMapper::toDto)
                .collect(Collectors.toList());
    }
}
