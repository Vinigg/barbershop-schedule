package br.com.dio.backend.repository;

import br.com.dio.backend.model.entity.Appointment;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    Appointment findByEmail(String email);

    boolean existsById(@NotNull Long id);

    boolean existsByEmail(@NotBlank(message = "Email é obrigatório") @Email String email);
}
