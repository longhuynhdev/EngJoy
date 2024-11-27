package com.suika.englishlearning.model.dto.user;

import com.suika.englishlearning.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangePasswordDto {
    private String email;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
