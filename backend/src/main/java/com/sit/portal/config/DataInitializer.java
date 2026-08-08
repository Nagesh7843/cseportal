package com.sit.portal.config;

import com.sit.portal.entity.User;
import com.sit.portal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            // Seed Super Admin in PostgreSQL sitportaldb if not present
            if (!userRepository.existsByEmail("gnagesh550@gmail.com")) {
                userRepository.save(User.builder()
                        .name("Nagesh")
                        .email("gnagesh550@gmail.com")
                        .password("N@gesh7843")
                        .role("admin")
                        .roleTitle("Super Administrator & Website Controller")
                        .department("Computer Science & Engineering")
                        .build());
            }
        };
    }
}
