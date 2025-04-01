package br.com.dio.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AppointmentRequestDTO {

    @NotBlank(message = "Email é obrigatório")
    @Email
    private String email;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^\\(\\d{2}\\)\\d{5}-\\d{4}$", message = "Telefone inválido")
    private String phone;

    @NotBlank(message = "Data é obrigatória")
    private String date; // Ou use LocalDate se possível

    @NotBlank(message = "Horário é obrigatório")
    private String time; // Ou use LocalTime se possível
}
