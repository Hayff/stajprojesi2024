package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GuessResponse {
   private Object data;
   private int status;
   private String message;
}
