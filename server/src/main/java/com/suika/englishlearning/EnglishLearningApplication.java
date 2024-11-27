package com.suika.englishlearning;

import com.suika.englishlearning.model.Category;
import com.suika.englishlearning.model.Difficulty;
import com.suika.englishlearning.model.Role;
import com.suika.englishlearning.repository.CategoryRepository;
import com.suika.englishlearning.repository.DifficultyRepository;
import com.suika.englishlearning.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class EnglishLearningApplication implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final DifficultyRepository difficultyRepository;
    public EnglishLearningApplication(RoleRepository roleRepository, CategoryRepository categoryRepository, DifficultyRepository difficultyRepository) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.difficultyRepository = difficultyRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EnglishLearningApplication.class, args);
    }

    @Override
    public void run(String... args) {
        // Create a list of default entities
        List<Role> roles = List.of(
                new Role("USER"),
                new Role("CONTENT_EDITOR"),
                new Role("ADMIN")
        );
        List<Category> categories = List.of(
                new Category(1,"Vocabulary"),
                new Category(2,"Reading"),
                new Category(3,"Grammar"),
                new Category(4,"Listening"),
                new Category(6,"Writing")
        );

        List<Difficulty> difficulties = List.of(
                new Difficulty(1,"Beginner"),
                new Difficulty(2,"Intermediate"),
                new Difficulty(3,"Advanced")
        );

        // Check if the entities already exist in the database
        for (Role role : roles) {
            if(roleRepository.findByName(role.getName()).isEmpty()) {
                roleRepository.save(role);
            }
        }
        for (Category category : categories) {
            if(categoryRepository.findByName(category.getName()).isEmpty()) {
                categoryRepository.save(category);
            }
        }

        for (Difficulty difficulty : difficulties) {
            if(difficultyRepository.findByName(difficulty.getName()).isEmpty()) {
                difficultyRepository.save(difficulty);
            }
        }
    }
}
