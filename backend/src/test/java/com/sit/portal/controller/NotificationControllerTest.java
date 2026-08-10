package com.sit.portal.controller;

import com.sit.portal.entity.FcmToken;
import com.sit.portal.repository.FcmTokenRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationControllerTest {
    @Mock private FcmTokenRepository fcmTokenRepository;
    @InjectMocks private NotificationController controller;

    @Test
    void rejectsEmptyFcmToken() {
        ResponseEntity<?> response = controller.registerToken(Map.of("token", ""));
        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(fcmTokenRepository);
    }

    @Test
    void updatesEmailForAnExistingFcmToken() {
        FcmToken token = FcmToken.builder().token("device-token").email("old@sit.ac.in").build();
        when(fcmTokenRepository.findByToken("device-token")).thenReturn(Optional.of(token));
        when(fcmTokenRepository.save(token)).thenReturn(token);

        ResponseEntity<?> response = controller.registerToken(Map.of("token", "device-token", "email", "new@sit.ac.in"));

        assertEquals(200, response.getStatusCode().value());
        assertEquals("new@sit.ac.in", token.getEmail());
        verify(fcmTokenRepository).save(token);
    }

    @Test
    void createsAnonymousWebTokenWhenEmailAndDeviceTypeAreMissing() {
        when(fcmTokenRepository.findByToken("device-token")).thenReturn(Optional.empty());
        when(fcmTokenRepository.save(any(FcmToken.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<?> response = controller.registerToken(Map.of("token", "device-token"));

        assertEquals(200, response.getStatusCode().value());
        verify(fcmTokenRepository).save(argThat(token -> token.getEmail().equals("anonymous@sit.ac.in")
                && token.getDeviceType().equals("Web Browser")));
    }
}
