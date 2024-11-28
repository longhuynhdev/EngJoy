package com.suika.englishlearning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Category {
    @Id
    private int id;
    private String name;

    public Category() {

    }

    public Category(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
