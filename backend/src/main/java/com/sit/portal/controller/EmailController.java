package com.sit.portal.controller;

import com.sit.portal.entity.EmailLogEntity;
import com.sit.portal.repository.EmailLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/email")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailLogRepository emailLogRepository;

    @GetMapping("/logs")
    public List<EmailLogEntity> getEmailLogs() {
        return emailLogRepository.findByOrderBySentAtDesc();
    }

    @PostMapping("/broadcast")
    public ResponseEntity<EmailLogEntity> recordBroadcast(@RequestBody EmailLogEntity emailLog) {
        EmailLogEntity savedLog = emailLogRepository.save(emailLog);
        return ResponseEntity.ok(savedLog);
    }
}
