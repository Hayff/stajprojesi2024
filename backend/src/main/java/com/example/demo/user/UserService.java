package com.example.demo.user;

import com.example.demo.jwt.JwtService;
import com.example.demo.responses.CommenResponse;
import com.example.demo.responses.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Kullanıcı doğrulama ve yanıt oluşturma
    public CommenResponse authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            LoginResponse loginResponse = createLoginResponse(user.get());
            return CommenResponse.builder()
                    .data(loginResponse)
                    .status(200)
                    .message("Giriş başarılı!")
                    .build();
        } else {
            return CommenResponse.builder()
                    .data(null)
                    .status(404)
                    .message("Geçersiz kullanıcı adı veya şifre.")
                    .build();
        }
    }

    // Kullanıcı kaydı ve yanıt oluşturma
    public CommenResponse registerUser(String username, String password, String passwordRepeat) {
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isEmpty() && password.equals(passwordRepeat)) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(password));
            userRepository.save(newUser);

            return CommenResponse.builder()
                    .data(username)
                    .status(200)
                    .message("Kayıt başarılı!")
                    .build();
        } else if (existingUser.isPresent()) {
            return CommenResponse.builder()
                    .data(null)
                    .status(501)
                    .message("Bu kullanıcı adı kullanılmakta")
                    .build();
        } else {
            return CommenResponse.builder()
                    .data(null)
                    .status(404)
                    .message("Şifreler uyuşmuyor veya bir hata oluştu")
                    .build();
        }
    }

    // Kullanıcı giriş yanıtını oluşturma
    private LoginResponse createLoginResponse(User user) {
        LoginResponse loginResponse = new LoginResponse();
        if (user != null && user.isEnabled()) {
            user.setPassword(null);
            loginResponse.setUser(user);
            loginResponse.setToken(jwtService.generateToken(user));
            loginResponse.setPrefix("Bearer");
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
        }
        return loginResponse;
    }

    public Optional<User> existsByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
