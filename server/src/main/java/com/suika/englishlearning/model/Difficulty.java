package com.suika.englishlearning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Difficulty {
    @Id
    private int id;
    private String name;

    public Difficulty() {
    }

    public Difficulty(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
