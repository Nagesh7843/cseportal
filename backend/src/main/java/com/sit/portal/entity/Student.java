package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "roll_no", unique = true, nullable = false)
    private String rollNo;

    @Column(name = "academic_year", nullable = false)
    private String academicYear;

    @Column(nullable = false)
    private String division;

    @Column(name = "batch_group", nullable = false)
    private String batchGroup;

    @Column(name = "cohort_batch", nullable = false)
    private String cohortBatch;

    @Column(name = "prn", unique = true, nullable = false)
    private String prn;

    @Column(nullable = false)
    private Double gpa;

    @Column(nullable = false)
    private String email;

    @Builder.Default
    private String status = "Active";
}
