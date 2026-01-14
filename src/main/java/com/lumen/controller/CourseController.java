package com.lumen.controller;

import com.lumen.dto.CourseDTO;
import com.lumen.model.Course;
import com.lumen.model.enums.Category;
import com.lumen.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course create(@RequestBody CourseDTO courseDTO) {
        return courseService.create(courseDTO);
    }

    @GetMapping
    public List<Course> list() {
        return courseService.findAll();
    }

    @GetMapping("/{id}")
    public Course find(@PathVariable Long id) {
        return courseService.findById(id);
    }

    @GetMapping("/category/{category}")
    public List<Course> findByCategory(@PathVariable Category category) {
        return courseService.findByCategory(category);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        return courseService.update(id, courseDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}
