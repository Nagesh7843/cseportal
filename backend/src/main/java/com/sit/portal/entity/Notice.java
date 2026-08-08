package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @Column(name = "author_role", nullable = false)
    private String authorRole;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String priority;

    @Column(nullable = false)
    private String status; // DRAFT, PUBLISHED, SCHEDULED

    @Column(name = "target_years")
    private String targetYears;

    @Column(name = "target_divisions")
    private String targetDivisions;

    @Column(name = "target_batches")
    private String targetBatches;

    @Column(name = "published_at", nullable = false)
    private String publishedAt;

    @Column(name = "scheduled_at")
    private String scheduledAt;

    @Column(name = "expires_at")
    private String expiresAt; // Auto-deletion timestamp or timer

    @Column(name = "views_count")
    private Integer viewsCount = 0;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
