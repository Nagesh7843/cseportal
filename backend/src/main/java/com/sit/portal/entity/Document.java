package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String category; // Course Material, Assignment, Lab Guide, Syllabus

    private String fileSize;

    private String fileType;

    private String uploadedBy;

    private String downloadUrl;

    @Builder.Default
    private LocalDateTime uploadedAt = LocalDateTime.now();
}
