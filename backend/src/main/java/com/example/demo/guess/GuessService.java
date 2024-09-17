package com.example.demo.guess;

import com.example.demo.dto.GuessResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuessService {

    @Autowired
    private GuessRepository guessRepository;

    // Asal sayı kontrolü
    public boolean isPrime(int number) {
        if (number <= 1) return false;

        else if (number % 2 == 0 && number != 2) return false;

        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    // Tahmini işleme ve geri dönüş mesajı oluşturma
    public GuessResponse processGuess(String username, int guess) {
        if (isPrime(guess)) {
            saveGuess(username, guess);
            return GuessResponse.builder()
                    .message("Veri başarıyla kaydedildi.")
                    .status(200)
                    .data(guess)
                    .build();
        } else {
            return GuessResponse.builder()
                    .message("Girdiğiniz sayı asal değil, veri kaydedilmedi.")
                    .status(400)
                    .data(guess)
                    .build();
        }
    }

    // Tahmini veritabanına kaydetme
    public void saveGuess(String firstName, int guess) {
        Guess guessEntity = new Guess();
        guessEntity.setFirstName(firstName);
        guessEntity.setGuess(guess);
        guessRepository.save(guessEntity);
    }

    // Tüm tahminleri getirme
    public List<Guess> getAllGuesses() {
        List<Guess> users = guessRepository.findAll();
        users.sort((u1, u2) -> Integer.compare(u2.getGuess(), u1.getGuess()));
        return users;
    }

    // Tüm tahminleri silme
    @Transactional
    public void deleteAllGuesses() {
        guessRepository.deleteAll();
    }
}
