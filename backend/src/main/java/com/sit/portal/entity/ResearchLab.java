package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "research_labs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResearchLab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String externalId; // To support string IDs like 'lab-1'
    private String name;
    private String head;
    private String location;
    private Integer activeProjects;
    private String grantsAmount;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String image;
}
