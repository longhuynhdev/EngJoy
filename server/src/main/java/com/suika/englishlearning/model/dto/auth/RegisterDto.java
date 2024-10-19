package com.suika.englishlearning.model.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
    private String userName;
    private String email;
    private String password;
}
