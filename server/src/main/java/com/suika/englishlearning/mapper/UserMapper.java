package com.suika.englishlearning.mapper;

import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.user.UserDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserDto toDto(UserEntity userEntity) {
        UserDto userDto = new UserDto();
        userDto.setName(userEntity.getName());
        userDto.setEmail(userEntity.getEmail());
        userDto.setPassword(userEntity.getPassword());
        userDto.setRole(userEntity.getRole());

        return userDto;
    }

    public UserEntity toEntity(UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(userDto.getName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setPassword(userDto.getPassword());
        userEntity.setRole(userDto.getRole());

        return userEntity;
    }

    public List<UserDto> toDtoList(List<UserEntity> userEntityList) {
        return userEntityList.stream().map(this::toDto).collect(Collectors.toList());
    }
}