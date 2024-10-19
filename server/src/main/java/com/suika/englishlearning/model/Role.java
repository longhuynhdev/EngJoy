package com.suika.englishlearning.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    private String name;

    @OneToMany(mappedBy = "role")
    private Set<UserEntity> users;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }
}
