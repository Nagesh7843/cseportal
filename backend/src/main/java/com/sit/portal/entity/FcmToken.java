package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "fcm_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FcmToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true, length = 500)
    private String token;

    @Column(name = "device_type")
    private String deviceType = "Web Browser";

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
