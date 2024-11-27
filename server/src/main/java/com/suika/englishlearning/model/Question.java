package com.suika.englishlearning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {
    @Id
    private int id;
    private String question;
    @OneToMany
    private List<Answer> answers;
}
