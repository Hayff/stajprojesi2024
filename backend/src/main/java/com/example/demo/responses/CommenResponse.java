package com.example.demo.responses;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommenResponse {
    private String message;
    private Object data;
    private int status;

}
