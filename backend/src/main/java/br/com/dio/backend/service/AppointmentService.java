package br.com.dio.backend.service;

import br.com.dio.backend.model.dto.AppointmentRequestDTO;
import br.com.dio.backend.model.dto.AppointmentResponseDTO;

public interface AppointmentService {
    AppointmentResponseDTO findByEmail(String email);
    AppointmentResponseDTO create ( AppointmentRequestDTO request);
    AppointmentResponseDTO update (Long id, AppointmentRequestDTO requestDTO);
    void delete(Long id);
}
