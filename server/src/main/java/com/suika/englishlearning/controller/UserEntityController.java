package com.suika.englishlearning.controller;

import com.suika.englishlearning.model.dto.user.UserDto;
import com.suika.englishlearning.service.UserEntityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/userEntity")
public class UserEntityController {
    private final UserEntityService userEntityService;

    public UserEntityController(UserEntityService userEntityService) {
        this.userEntityService = userEntityService;
    }

    @GetMapping(path = "getUser{email}")
    public UserDto getUserByEmail(@PathVariable("email") String email) {
        return userEntityService.getUserByEmail(email);
    }

    @GetMapping(path = "getUsers")
    public List<UserDto> getUsers() {
        return userEntityService.getUsers();
    }

//    @PutMapping(path = "updateUserByName{name}")
//    public void updateUserByName(@PathVariable("name") String name,
//                                 @RequestParam(required = false) String email) {
//        userEntity.setName(name);
//    }
}
