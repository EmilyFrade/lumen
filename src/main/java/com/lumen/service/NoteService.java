package com.lumen.service;

import com.lumen.model.Note;
import com.lumen.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note create(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> findByCourse(Long courseId) {
        return noteRepository.findByCourseId(courseId);
    }
}
