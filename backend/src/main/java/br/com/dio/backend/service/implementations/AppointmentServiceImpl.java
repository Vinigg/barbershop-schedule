package br.com.dio.backend.service.implementations;

import br.com.dio.backend.exceptions.BusinessRuleException;
import br.com.dio.backend.model.dto.AppointmentRequestDTO;
import br.com.dio.backend.model.dto.AppointmentResponseDTO;
import br.com.dio.backend.model.entity.Appointment;
import br.com.dio.backend.model.mapper.AppointmentMapper;
import br.com.dio.backend.repository.AppointmentRepository;
import br.com.dio.backend.service.AppointmentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private AppointmentMapper mapper;

    @Override
    public boolean checkEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {
        List<Appointment> appointments;

        appointments = repository.findAll(); // Busca todos

        return appointments.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentResponseDTO findByEmail(String email) {
        Appointment appointmentFound = repository.findByEmail(email);
        return mapper.toDTO(appointmentFound);
    }

    @Override
    public AppointmentResponseDTO create(AppointmentRequestDTO request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new BusinessRuleException("Já existe um agendamento com este e-mail.");
        }
        Appointment entity = mapper.toEntity(request);
        Appointment savedEntity = repository.save(entity);
        return mapper.toDTO(savedEntity);
    }

    @Override
    public AppointmentResponseDTO update(Long id, AppointmentRequestDTO requestDTO) {
        // 1. Busca o appointment existente
        Appointment existingAppointment = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        // 2. Atualiza apenas os campos
        existingAppointment.setEmail(requestDTO.getEmail());
        existingAppointment.setName(requestDTO.getName());
        existingAppointment.setPhone(requestDTO.getPhone());
        existingAppointment.setDate(requestDTO.getDate());
        existingAppointment.setTime(requestDTO.getTime());

        // 3. Salva e retorna o DTO atualizado
        Appointment updatedAppointment = repository.save(existingAppointment);
        return mapper.toDTO(updatedAppointment);
    }

    @Override
    public void delete(Long id) {
        // Verifica se o appointment existe antes de deletar
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
