package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "laboratories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Laboratory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    private String name;
    private String computers;
    private String processor;
    private String ram;
    private String storage;
    private String additionalEquipment;
    private String totalCost;
}
