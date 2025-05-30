package br.com.dio.backend.controller;

import br.com.dio.backend.model.dto.AppointmentRequestDTO;
import br.com.dio.backend.model.dto.AppointmentResponseDTO;
import br.com.dio.backend.service.implementations.AppointmentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentServiceImpl service;

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(
            @Valid @RequestBody AppointmentRequestDTO request) {
        AppointmentResponseDTO response = service.create(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponseDTO>> getAllAppointments() {
        List<AppointmentResponseDTO> appointments = service.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailUnique(@PathVariable String email) {
        boolean exists = service.checkEmail(email);
        return ResponseEntity.ok(!exists); // Retorna true se o e-mail for único
    }

    @GetMapping("/{email}")
    public ResponseEntity<AppointmentResponseDTO> getAppointmentByEmail(@PathVariable String email){
        AppointmentResponseDTO response= service.findByEmail(email);
        if (response == null) {
            return ResponseEntity.notFound().build(); // Retorna 404
        }
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> patchAppointment(@PathVariable Long id,
                                                                   @Valid @RequestBody AppointmentRequestDTO requestDTO) {
        // 1. Validação básica
        if (id == null || requestDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        // 2. Chama o service para atualizar
        AppointmentResponseDTO updatedAppointment = service.update(id, requestDTO);

        // 3. Retorna o DTO atualizado
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id){
        try {
            service.delete(id);
            return ResponseEntity.noContent().build(); // HTTP 204 (No Content)
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // HTTP 404 (Not Found)
        }
    }
}
