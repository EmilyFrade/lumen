package com.lumen.service;

import com.lumen.model.Course;
import com.lumen.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserService userService;

    public Course create(Course course) {
        course.setProgress(0);
        course.setUser(userService.getCurrentUser());
        return courseRepository.save(course);
    }

    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public Course findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
    }

    public List<Course> findByCategory(Long categoryId) {
        return courseRepository.findByCategoryId(categoryId);
    }

    public Course update(Long id, Course course) {
        Course existing = findById(id);

        existing.setTitle(course.getTitle());
        existing.setDescription(course.getDescription());
        existing.setCategory(course.getCategory());
        existing.setProgress(course.getProgress());
        existing.setRating(course.getRating());

        return courseRepository.save(existing);
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }
}
