package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.QuestionMapper;
import com.suika.englishlearning.model.Answer;
import com.suika.englishlearning.model.Lesson;
import com.suika.englishlearning.model.Question;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.QuestionDto;
import com.suika.englishlearning.model.dto.lesson.LessonRequestDto;
import com.suika.englishlearning.model.dto.lesson.LessonResponseDto;
import com.suika.englishlearning.repository.AnswerRepository;
import com.suika.englishlearning.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.questionMapper = questionMapper;
    }

    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(int id) {
        return questionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }

    public QuestionDto createLesson(QuestionDto questionDto) {
        Question question = questionMapper.toEntity(questionDto);

        List<Answer> answers = question.getAnswers();
        if (answers != null) {
            answerRepository.saveAll(answers);
        }

        return questionMapper.toDto(questionRepository.save(question));
    }
}
