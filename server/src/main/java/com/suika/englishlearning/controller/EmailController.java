package com.suika.englishlearning.controller;

import com.suika.englishlearning.model.dto.email.EmailDetails;
import com.suika.englishlearning.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSimpleMail(@RequestBody EmailDetails details) {
        String response = emailService.sendSimpleMail(details);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    /*
    @PostMapping("/send-with-attachment")
    public ResponseEntity<String> sendMailWithAttachment(@RequestBody EmailDetails details) {
        String response = emailService.sendMailWithAttachment(details);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
     */
}
