package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.QuestionMapper;
import com.suika.englishlearning.model.Answer;
import com.suika.englishlearning.model.Question;
import com.suika.englishlearning.model.dto.question.QuestionDto;
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

    public List<QuestionDto> getAllQuestion() {
        return questionMapper.toDtoList(questionRepository.findAll());
    }

    public QuestionDto getQuestionById(int id) {
        Question question = questionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        return questionMapper.toDto(question);
    }

    public List<QuestionDto> createQuestions(List<QuestionDto> questionDtos) {
        List<Question> questions = questionMapper.toEntityList(questionDtos);

        for (Question question : questions) {
            List<Answer> answers = question.getAnswers();
            if (answers != null) {
                answerRepository.saveAll(answers);
            }
        }

        return questionMapper.toDtoList(questionRepository.saveAll(questions));
    }
}
