package com.sit.portal.repository;

import com.sit.portal.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByAcademicYear(String academicYear);
    List<Student> findByAcademicYearAndDivision(String academicYear, String division);
}
