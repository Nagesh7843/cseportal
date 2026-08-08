package com.sit.portal.controller;

import com.sit.portal.config.JwtUtils;
import com.sit.portal.entity.User;
import com.sit.portal.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock private UserRepository userRepository;
    @Mock private JwtUtils jwtUtils;
    @Mock private PasswordEncoder passwordEncoder;
    @InjectMocks private AuthController controller;

    @Test
    void rejectsLoginWhenCredentialsAreIncomplete() {
        ResponseEntity<?> response = controller.login(Map.of("email", "student@sit.ac.in"));

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Email and password are required.", ((Map<?, ?>) response.getBody()).get("message"));
        verifyNoInteractions(userRepository, jwtUtils, passwordEncoder);
    }

    @Test
    void registersFirstLoginWithNormalisedEmailAndRequestedRole() {
        User savedUser = User.builder().email("student@sit.ac.in").role("student").build();
        when(userRepository.findByEmail("student@sit.ac.in")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtUtils.generateToken("student@sit.ac.in", "student")).thenReturn("jwt");

        ResponseEntity<?> response = controller.login(Map.of(
                "email", " Student@SIT.AC.IN ", "password", "password", "role", "student"));

        assertEquals(200, response.getStatusCode().value());
        assertEquals("jwt", ((Map<?, ?>) response.getBody()).get("token"));
        verify(userRepository).findByEmail("student@sit.ac.in");
        verify(userRepository).save(argThat(user -> user.getEmail().equals("student@sit.ac.in")
                && user.getPassword().equals("encoded-password") && user.getRole().equals("student")));
    }

    @Test
    void rejectsIncorrectPasswordForAnExistingUser() {
        User user = User.builder().email("student@sit.ac.in").password("encoded-password").role("student").build();
        when(userRepository.findByEmail("student@sit.ac.in")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded-password")).thenReturn(false);

        ResponseEntity<?> response = controller.login(Map.of("email", "student@sit.ac.in", "password", "wrong"));

        assertEquals(401, response.getStatusCode().value());
        assertEquals("Invalid credentials.", ((Map<?, ?>) response.getBody()).get("message"));
        verify(jwtUtils, never()).generateToken(anyString(), anyString());
    }
}
