package com.suika.englishlearning.controller;

import com.suika.englishlearning.exception.IncorrectPasswordException;
import com.suika.englishlearning.exception.InvalidEmailException;
import com.suika.englishlearning.model.dto.auth.AuthDto;
import com.suika.englishlearning.model.dto.auth.AuthResponseDto;
import com.suika.englishlearning.model.dto.auth.LoginDto;
import com.suika.englishlearning.model.dto.auth.RegisterDto;
import com.suika.englishlearning.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        try {
            String response = authService.register(registerDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (InvalidEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            AuthDto response = authService.login(loginDto);
            AuthResponseDto responseDto = new AuthResponseDto(response.getName(), response.getEmail(), response.getRole());
            ResponseCookie cookie = ResponseCookie.from("token", response.getAccessToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(responseDto);
        } catch (InvalidEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IncorrectPasswordException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // reference: https://medium.com/@sallu-salman/implementing-sign-in-with-google-in-spring-boot-application-5f05a34905a8
    @GetMapping("googlegrantcode")
    public ResponseEntity<?> grantCode(@RequestParam("code") String code, @RequestParam("scope") String scope, @RequestParam("authuser") String authUser, @RequestParam("prompt") String prompt) {
        AuthDto response = authService.processGrantCode(code);
        AuthResponseDto responseDto = new AuthResponseDto(response.getName(), response.getEmail(), response.getRole());
        ResponseCookie cookie = ResponseCookie.from("token", response.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(responseDto);
    }

    @ExceptionHandler({InvalidEmailException.class, IncorrectPasswordException.class})
    public ResponseEntity<String> handleAuthExceptions(RuntimeException e) {
        if (e instanceof InvalidEmailException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } else if (e instanceof IncorrectPasswordException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }
}