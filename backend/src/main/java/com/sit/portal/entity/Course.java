package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String title;
    private Integer semester;
    private Integer credits;
    private String type;
    private String instructor;
    
    @Column(length = 1000)
    private String description;
}
