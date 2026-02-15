package com.lumen.service;

import com.lumen.dto.CourseDTO;
import com.lumen.model.Course;
import com.lumen.model.Module;
import com.lumen.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Course create(CourseDTO courseDTO) {
        Course course = Course.builder()
                .title(courseDTO.getTitle())
                .description(courseDTO.getDescription())
                .category(courseDTO.getCategory())
                .status(courseDTO.getStatus())
                .instructor(courseDTO.getInstructor())
                .duration(courseDTO.getDuration())
                .paid(courseDTO.getPaid() != null ? courseDTO.getPaid() : false)
                .price(courseDTO.getPrice())
                .accessLink(courseDTO.getAccessLink())
                .progress(0)
                .user(userService.getCurrentUser())
                .build();

        Course savedCourse = courseRepository.save(course);

        if (courseDTO.getModules() != null && !courseDTO.getModules().isEmpty()) {
            Course finalSavedCourse = savedCourse;

            List<Module> modules = courseDTO.getModules().stream()
                    .map(moduleName -> Module.builder()
                            .name(moduleName)
                            .course(finalSavedCourse)
                            .build())
                    .collect(Collectors.toList());

            savedCourse.setModules(modules);
            savedCourse = courseRepository.save(savedCourse);
        }

        return savedCourse;
    }

    public List<Course> findAll() {
        return courseRepository.findByUserId(userService.getCurrentUser().getId());
    }

    public Course findById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        
        if (!course.getUser().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("Acesso negado");
        }
        
        return course;
    }

    @Transactional
    public Course update(Long id, CourseDTO courseDTO) {
        Course existing = findById(id);

        existing.setTitle(courseDTO.getTitle());
        existing.setDescription(courseDTO.getDescription());
        existing.setCategory(courseDTO.getCategory());
        existing.setProgress(courseDTO.getProgress());
        existing.setRating(courseDTO.getRating());
        existing.setStatus(courseDTO.getStatus());
        existing.setInstructor(courseDTO.getInstructor());
        existing.setDuration(courseDTO.getDuration());
        existing.setPaid(courseDTO.getPaid() != null ? courseDTO.getPaid() : false);
        existing.setPrice(courseDTO.getPrice());
        existing.setNotes(courseDTO.getNotes());
        existing.setAccessLink(courseDTO.getAccessLink());

        existing.getModules().clear();
        if (courseDTO.getModules() != null && !courseDTO.getModules().isEmpty()) {
            courseDTO.getModules().forEach(moduleName -> {
                Module module = Module.builder()
                        .name(moduleName)
                        .course(existing)
                        .build();
                existing.getModules().add(module);
            });
        }

        return courseRepository.save(existing);
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }
}
