package br.com.dio.backend.repository;

import br.com.dio.backend.model.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    Appointment findByEmail(String email);
    boolean existsById(Long id);
}
