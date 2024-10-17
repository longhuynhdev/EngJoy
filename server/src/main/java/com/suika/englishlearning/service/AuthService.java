package com.suika.englishlearning.service;

import com.suika.englishlearning.model.Role;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.auth.AuthResponseDto;
import com.suika.englishlearning.model.dto.auth.LoginDto;
import com.suika.englishlearning.model.dto.auth.RegisterDto;
import com.suika.englishlearning.repository.RoleRepository;
import com.suika.englishlearning.repository.UserRepository;
import com.suika.englishlearning.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.regex.Pattern;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    public ResponseEntity<String> register(RegisterDto registerDto) {
        if (!isValidEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Invalid email format", HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email address is already in the system", HttpStatus.BAD_REQUEST);
        }
        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    public ResponseEntity<AuthResponseDto> login(LoginDto loginDto) {
        if (!isValidEmail(loginDto.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }
}
