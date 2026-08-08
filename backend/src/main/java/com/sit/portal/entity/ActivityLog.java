package com.sit.portal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    @Column(name = "time_ago")
    private String timeAgo = "Just now";

    private String icon = "campaign";

    private String type = "notice";

    @Column(name = "color_bg")
    private String colorBg = "bg-[#d9e2ff]";

    @Column(name = "color_icon")
    private String colorIcon = "text-[#00429c]";

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
