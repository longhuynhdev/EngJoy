package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.ResourceNotFoundException;
import com.suika.englishlearning.mapper.UserMapper;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.user.UserDto;
import com.suika.englishlearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserEntityService {
    public final UserRepository userRepository;
    public final UserMapper userMapper;

    public UserEntityService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDto> getUsers() {
        List<UserDto> userDtos = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findAll();

        for(UserEntity user : userEntities) {
            userDtos.add(userMapper.toDto(user));
        }
        return userDtos;
    }

    public UserDto getUserByEmail(String email) {
        return userMapper.toDto(userRepository.findByEmail(email).
                orElseThrow(() -> new ResourceNotFoundException("User not fould")));
    }
}
