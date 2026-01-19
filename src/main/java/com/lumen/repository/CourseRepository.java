package com.lumen.repository;

import com.lumen.model.Course;
import com.lumen.model.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByUserId(Long userId);

    List<Course> findByCategoryAndUserId(Category category, Long userId);
}
