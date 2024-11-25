package com.suika.englishlearning;

import com.suika.englishlearning.model.Role;
import com.suika.englishlearning.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class EnglishLearningApplication implements CommandLineRunner {

    private final RoleRepository roleRepository;
    public EnglishLearningApplication(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EnglishLearningApplication.class, args);
    }


    @Override
    public void run(String... args) {
        // Create a list of default roles
        List<Role> roles = List.of(
                new Role("USER"),
                new Role("CONTENT_EDITOR"),
                new Role("ADMIN")
        );
        // Check if the roles already exist in the database
        for (Role role : roles) {
            if(roleRepository.findByName(role.getName()).isEmpty()) {
                roleRepository.save(role);
            }
        }
    }
}
