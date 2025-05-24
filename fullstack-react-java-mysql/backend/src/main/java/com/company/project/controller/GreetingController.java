package com.company.project.controller;

import com.company.project.entity.Greeting;
import com.company.project.repository.GreetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GreetingController {

    @Autowired
    private GreetingRepository greetingRepository;

    @GetMapping("/greetings")
    public List<Greeting> getAllGreetings() {
        return greetingRepository.findAll();
    }

    @PostMapping("/greetings")
    public Greeting createGreeting(@RequestBody Greeting greeting) {
        return greetingRepository.save(greeting);
    }

    @DeleteMapping("/greetings/{id}")
    public ResponseEntity<?> deleteGreeting(@PathVariable Long id) {
        greetingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 