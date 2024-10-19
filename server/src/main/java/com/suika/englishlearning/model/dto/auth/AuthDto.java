package com.suika.englishlearning.model.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDto {
    private String userName;
    private String email;
    private String role;
    private String accessToken;
    private String tokenType = "Bearer ";

    public AuthDto(String userName, String email, String role, String accessToken) {
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.accessToken = accessToken;
    }

}
