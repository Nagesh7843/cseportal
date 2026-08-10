package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faculty")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialization;

    @Column(name = "rank_title", nullable = false)
    private String rankTitle;

    @Column(nullable = false)
    private String status; // 'ON CAMPUS', 'IN MEETING', 'IN LAB', 'OFF CAMPUS'

    @Column(nullable = false)
    private String email;

    @Column(name = "office_hours")
    private String officeHours;

    @Column(name = "publications_count")
    @Builder.Default
    private Integer publicationsCount = 0;
}
