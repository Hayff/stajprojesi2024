package com.example.demo.guess;

import com.example.demo.dto.GuessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GuessController {

    @Autowired
    private GuessService guessService;

    @PostMapping("/submit")
    public ResponseEntity<GuessResponse> handleFormSubmit(@RequestBody Guess request) {
        GuessResponse response = guessService.processGuess(request.getFirstName(), request.getGuess());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Guess>> listUsers() {
        List<Guess> users = guessService.getAllGuesses();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllUsers() {
        guessService.deleteAllGuesses();
        return ResponseEntity.ok("Silindi.");
    }
}
