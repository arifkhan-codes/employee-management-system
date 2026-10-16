package com.ems.repository;

import com.ems.entity.Attendance;
import com.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUser(User user);
    Optional<Attendance> findByUserAndDate(User user, LocalDate date);
    List<Attendance> findByDate(LocalDate date);
}
