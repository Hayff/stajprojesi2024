package com.example.demo.responses;

import com.example.demo.user.User;
import lombok.Data;

@Data
public class LoginResponse {
    private User user;
    private String token;
    private String prefix;
    private long expiresIn;


}