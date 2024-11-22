package com.suika.englishlearning.controller;

import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.service.UserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/userEntity")
public class UserEntityController {
    private final UserEntityService userEntityService;

    @Autowired
    public UserEntityController(UserEntityService userEntityService) {
        this.userEntityService = userEntityService;
    }

    @GetMapping(path = "getUser{email}")
    public Optional<UserEntity> getUserByEmail(@PathVariable("email") String email) {
        return userEntityService.getUserByEmail(email);
    }

    @GetMapping(path = "getUsers")
    public List<UserEntity> getUsers() {
        return userEntityService.getUsers();
    }

//    @PutMapping(path = "updateUserByName{name}")
//    public void updateUserByName(@PathVariable("name") String name,
//                                 @RequestParam(required = false) String email) {
//        userEntity.setName(name);
//    }
}
