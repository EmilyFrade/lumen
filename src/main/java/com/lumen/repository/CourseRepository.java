package com.lumen.repository;

import com.lumen.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCategoryId(Long categoryId);

    List<Course> findByUserId(Long userId);
}
