package br.com.dio.backend.model.dto;

import lombok.Data;

@Data
public class AppointmentResponseDTO {

    private Long id;
    private String email;
    private String name;
    private String phone;
    private String date; // Pode ser formatado (ex: "dd/MM/yyyy")
    private String time; // Pode ser formatado (ex: "HH:mm")
}
