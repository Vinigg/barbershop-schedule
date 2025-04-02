package br.com.dio.backend.model.dto;

import lombok.Data;

@Data
public class UserResponseDTO {

    private Long id;
    private String email;
    private String name;
    private String password;
}
