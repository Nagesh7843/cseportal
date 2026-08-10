package com.sit.portal.service;

import com.sit.portal.dto.BroadcastRequest;
import com.sit.portal.entity.EmailLogEntity;
import com.sit.portal.entity.Faculty;
import com.sit.portal.entity.Student;
import com.sit.portal.repository.EmailLogRepository;
import com.sit.portal.repository.FacultyRepository;
import com.sit.portal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    @Autowired
    private EmailLogRepository emailLogRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired(required = false)
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username:admin@sit.ac.in}")
    private String senderEmail;

    @Autowired
    private org.springframework.scheduling.TaskScheduler taskScheduler;

    public EmailLogEntity processBroadcast(BroadcastRequest request) {
        List<String> targetEmails = new ArrayList<>();
        String groupName = "";
        
        if ("STUDENT".equalsIgnoreCase(request.getTargetRole())) {
            List<Student> students = studentRepository.findAll();
            if (request.getFilters().getAcademicYears() != null && !request.getFilters().getAcademicYears().isEmpty()) {
                students = students.stream().filter(s -> request.getFilters().getAcademicYears().contains(s.getAcademicYear())).collect(Collectors.toList());
            }
            if (request.getFilters().getDivisions() != null && !request.getFilters().getDivisions().isEmpty()) {
                students = students.stream().filter(s -> request.getFilters().getDivisions().contains(s.getDivision())).collect(Collectors.toList());
            }
            if (request.getFilters().getBatches() != null && !request.getFilters().getBatches().isEmpty()) {
                students = students.stream().filter(s -> request.getFilters().getBatches().contains(s.getBatchGroup())).collect(Collectors.toList());
            }
            targetEmails = students.stream().map(Student::getEmail).collect(Collectors.toList());
            groupName = "Students (" + String.join(", ", request.getFilters().getAcademicYears() != null ? request.getFilters().getAcademicYears() : List.of("All")) + ")";
        } else {
            List<Faculty> faculties = facultyRepository.findAll();
            if (request.getFilters().getFacultyIds() != null && !request.getFilters().getFacultyIds().isEmpty()) {
                faculties = faculties.stream().filter(f -> request.getFilters().getFacultyIds().contains(String.valueOf(f.getId()))).collect(Collectors.toList());
            }
            targetEmails = faculties.stream().map(Faculty::getEmail).collect(Collectors.toList());
            groupName = "Faculty (Manual Selection: " + targetEmails.size() + " members)";
        }

        boolean isScheduled = request.getScheduledAt() != null && !request.getScheduledAt().trim().isEmpty();

        // Save Audit Log
        EmailLogEntity log = new EmailLogEntity();
        log.setSubject(request.getSubject());
        log.setContent(request.getContent());
        log.setPriority(request.getPriority());
        log.setRecipientGroup(groupName);
        log.setRecipientCount(targetEmails.size());
        log.setOpenRate("0.0%");
        log.setStatus(isScheduled ? "SCHEDULED" : "SUCCESS");

        EmailLogEntity savedLog = emailLogRepository.save(log);

        if (isScheduled) {
            try {
                java.time.LocalDateTime localDateTime = java.time.LocalDateTime.parse(request.getScheduledAt());
                java.time.Instant executeTime = localDateTime.atZone(java.time.ZoneId.systemDefault()).toInstant();
                List<String> finalTargetEmails = targetEmails;
                taskScheduler.schedule(() -> {
                    dispatchEmails(finalTargetEmails, request);
                    savedLog.setStatus("SUCCESS");
                    emailLogRepository.save(savedLog);
                    System.out.println("Scheduled broadcast executed successfully for log ID: " + savedLog.getId());
                }, executeTime);
                System.out.println("Broadcast scheduled for: " + executeTime.toString());
            } catch (Exception e) {
                System.err.println("Failed to schedule broadcast: " + e.getMessage());
                savedLog.setStatus("FAILED");
                emailLogRepository.save(savedLog);
            }
        } else {
            dispatchEmails(targetEmails, request);
        }

        return savedLog;
    }

    private boolean dispatchEmails(List<String> targetEmails, BroadcastRequest request) {
        if (javaMailSender != null && !targetEmails.isEmpty()) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                String fromAddr = (request.getSenderEmail() != null && !request.getSenderEmail().trim().isEmpty())
                        ? request.getSenderEmail().trim()
                        : senderEmail;
                message.setFrom(fromAddr);
                message.setReplyTo(fromAddr);
                message.setBcc(targetEmails.toArray(new String[0]));
                message.setSubject(request.getSubject());
                message.setText(request.getContent());
                javaMailSender.send(message);
                System.out.println("Dispatched real email broadcast from " + fromAddr + " to " + targetEmails.size() + " recipients.");
                return true;
            } catch (Exception e) {
                System.err.println("Failed to dispatch real email: " + e.getMessage());
                return false;
            }
        } else {
            System.out.println("Simulated email broadcast to " + targetEmails.size() + " recipients (JavaMailSender not configured or no recipients).");
            return true;
        }
    }
}
