package com.suika.englishlearning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Answer {
    @Id
    private int id;
    private String answer;
    private String explanation;
    private boolean idCorrect;
}
