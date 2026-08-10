package com.sit.portal.controller;

import com.sit.portal.entity.Notice;
import com.sit.portal.repository.NoticeRepository;
import com.sit.portal.repository.FcmTokenRepository;
import com.sit.portal.service.PushNotificationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NoticeControllerTest {
    @Mock private NoticeRepository noticeRepository;
    @Mock private FcmTokenRepository fcmTokenRepository;
    @Mock private PushNotificationService pushNotificationService;
    @InjectMocks private NoticeController controller;

    @Test
    void assignsCurrentDateWhenCreatingNoticeWithoutPublishTime() throws Exception {
        Notice notice = Notice.builder().title("Exam timetable").build();
        when(noticeRepository.save(notice)).thenReturn(notice);
        when(fcmTokenRepository.findAll()).thenReturn(Collections.emptyList());

        ResponseEntity<Notice> response = controller.createNotice(notice);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody().getPublishedAt());
        assertNotEquals("Just now", response.getBody().getPublishedAt());
        verify(noticeRepository).save(notice);
    }

    @Test
    void keepsExplicitPublishTimeWhenCreatingNotice() throws Exception {
        Notice notice = Notice.builder().title("Exam timetable").publishedAt("Tomorrow").build();
        when(noticeRepository.save(any(Notice.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(fcmTokenRepository.findAll()).thenReturn(Collections.emptyList());

        controller.createNotice(notice);

        assertEquals("Tomorrow", notice.getPublishedAt());
    }

    @Test
    void deletesTheRequestedNotice() {
        ResponseEntity<Void> response = controller.deleteNotice(42L);

        assertEquals(204, response.getStatusCode().value());
        verify(noticeRepository).deleteById(42L);
    }
}
