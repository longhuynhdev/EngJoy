package com.suika.englishlearning.mapper;

import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.user.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto toDto(UserEntity user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().getName());
        return userDto;
    }
}
