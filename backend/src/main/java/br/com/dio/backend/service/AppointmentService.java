package br.com.dio.backend.service;

import br.com.dio.backend.model.dto.AppointmentRequestDTO;
import br.com.dio.backend.model.dto.AppointmentResponseDTO;

import java.util.List;

public interface AppointmentService {


    List<AppointmentResponseDTO> getAllAppointments();

    AppointmentResponseDTO findByEmail(String email);

    AppointmentResponseDTO create ( AppointmentRequestDTO requestDTO);

    AppointmentResponseDTO update (Long id, AppointmentRequestDTO requestDTO);

    void delete(Long id);
    boolean checkEmail(String email);
}
