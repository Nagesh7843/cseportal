package com.sit.portal.controller;

import com.sit.portal.config.JwtUtils;
import com.sit.portal.entity.User;
import com.sit.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        String requestedRole = loginRequest.get("role");

        if (email == null || password == null) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Email and password are required.");
            return ResponseEntity.badRequest().body(err);
        }

        String cleanEmail = email.trim().toLowerCase();
        User user = null;

        // Check Super Admin Nagesh credentials
        if ("gnagesh550@gmail.com".equalsIgnoreCase(cleanEmail)) {
            if ("N@gesh7843".equals(password)) {
                Optional<User> adminUser = userRepository.findByEmail("gnagesh550@gmail.com");
                user = adminUser.orElseGet(() -> userRepository.save(User.builder()
                        .name("Nagesh")
                        .email("gnagesh550@gmail.com")
                        .password(passwordEncoder.encode("N@gesh7843"))
                        .role("admin")
                        .roleTitle("Super Administrator & Website Controller")
                        .department("Computer Science & Engineering")
                        .build()));
            } else {
                Map<String, String> err = new HashMap<>();
                err.put("message", "Invalid password for Super Admin.");
                return ResponseEntity.status(401).body(err);
            }
        } else {
            // DB Lookup
            Optional<User> userOpt = userRepository.findByEmail(cleanEmail);
            if (userOpt.isPresent()) {
                user = userOpt.get();
                // Validate password
                if (!passwordEncoder.matches(password, user.getPassword()) && !password.equals(user.getPassword())) {
                    Map<String, String> err = new HashMap<>();
                    err.put("message", "Invalid credentials.");
                    return ResponseEntity.status(401).body(err);
                }
            } else {
                // Auto-register user in DB on first login for seamless onboarding
                String roleToSet = requestedRole != null ? requestedRole : "student";
                user = userRepository.save(User.builder()
                        .name((roleToSet.substring(0, 1).toUpperCase() + roleToSet.substring(1)) + " User")
                        .email(cleanEmail)
                        .password(passwordEncoder.encode(password))
                        .role(roleToSet)
                        .roleTitle(roleToSet.equalsIgnoreCase("faculty") ? "Assistant Professor" : "B.Tech Student")
                        .department("Computer Science & Engineering")
                        .build());
            }
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        response.put("role", user.getRole());
        response.put("message", "Authentication successful.");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "User with this email already exists in PostgreSQL database.");
            return ResponseEntity.badRequest().body(err);
        }

        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        User savedUser = userRepository.save(userRequest);
        String token = jwtUtils.generateToken(savedUser.getEmail(), savedUser.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);
        response.put("role", savedUser.getRole());
        return ResponseEntity.ok(response);
    }
}
