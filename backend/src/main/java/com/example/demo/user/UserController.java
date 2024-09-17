package com.example.demo.user;

import com.example.demo.responses.CommenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<CommenResponse> login(@RequestBody UserRequest loginRequest) {
        CommenResponse response = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signUp")
    public ResponseEntity<CommenResponse> signUp(@RequestBody UserRequest userRequest) {
        CommenResponse response = userService.registerUser(userRequest.getUsername(), userRequest.getPassword(), userRequest.getPasswordRepeat());
        return ResponseEntity.ok(response);
    }
}
