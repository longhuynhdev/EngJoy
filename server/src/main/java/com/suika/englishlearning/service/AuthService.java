package com.suika.englishlearning.service;

import com.suika.englishlearning.exception.IncorrectPasswordException;
import com.suika.englishlearning.exception.InvalidEmailException;
import com.suika.englishlearning.model.Role;
import com.suika.englishlearning.model.UserEntity;
import com.suika.englishlearning.model.dto.auth.AuthDto;
import com.suika.englishlearning.model.dto.auth.LoginDto;
import com.suika.englishlearning.model.dto.auth.RegisterDto;
import com.suika.englishlearning.repository.RoleRepository;
import com.suika.englishlearning.repository.UserRepository;
import com.suika.englishlearning.security.JWTGenerator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    private boolean isNotValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return !pattern.matcher(email).matches();
    }

    public String register(RegisterDto registerDto) {
        if (isNotValidEmail(registerDto.getEmail())) {
            throw new InvalidEmailException("Invalid email format");
        }
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            throw new InvalidEmailException("Email address already in use");
        }
        UserEntity user = new UserEntity();
        user.setUserName(registerDto.getUserName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        // Set default role to USER
        Role role = roleRepository.findByName("USER").orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRole(role);

        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthDto login(LoginDto loginDto) {
        if (isNotValidEmail(loginDto.getEmail())) {
            throw new InvalidEmailException("Invalid email format");
        }
        if (!userRepository.existsByEmail(loginDto.getEmail())) {
            throw new InvalidEmailException("Incorrect email address or password");
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
                            loginDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);

            UserEntity user = userRepository.findByEmail(loginDto.getEmail()).get();
            String role = user.getRole().getName();

            return new AuthDto(user.getUserName(), user.getEmail(),role,token);

        } catch (Exception e) {
            throw new IncorrectPasswordException("Incorrect email address or password");
        }

    }
}
