package com.suika.englishlearning.repository;

import com.suika.englishlearning.model.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    @Query("select u.name, u.email, u.password from UserEntity u where u.email = :email")
    Optional<UserEntity> findByEmail(@Param("email") String email);

    Boolean existsByEmail(String email);
}
