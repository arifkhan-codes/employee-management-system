package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate date;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PRESENT, ABSENT, HALF_DAY, LEAVE
    }
}
