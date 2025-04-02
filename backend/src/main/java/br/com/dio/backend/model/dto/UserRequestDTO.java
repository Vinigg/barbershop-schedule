package br.com.dio.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequestDTO {

    @NotBlank(message = "Email é obrigatório")
    @Email
    private String email;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Senha é obrigatória")
    private String password;

}
