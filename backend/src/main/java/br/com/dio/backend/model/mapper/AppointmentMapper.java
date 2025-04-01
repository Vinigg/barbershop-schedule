package br.com.dio.backend.model.mapper;

import br.com.dio.backend.model.dto.AppointmentRequestDTO;
import br.com.dio.backend.model.dto.AppointmentResponseDTO;
import br.com.dio.backend.model.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mapping(target = "id", ignore = true) // Ignora o ID no DTO -> Entity
    Appointment toEntity(AppointmentRequestDTO dto);

    AppointmentResponseDTO toDTO(Appointment entity);
}
