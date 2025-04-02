package br.com.dio.backend.controller;

import br.com.dio.backend.model.dto.UserRequestDTO;
import br.com.dio.backend.model.dto.UserResponseDTO;
import br.com.dio.backend.service.implementations.UserServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl service;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO request){
        UserResponseDTO response = service.create(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailUnique(@PathVariable String email) {
        boolean exists = service.checkEmail(email);
        return ResponseEntity.ok(!exists); // Retorna true se o e-mail for único
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email){

        UserResponseDTO response = service.findByEmail(email);

        if (response == null) {
            return ResponseEntity.notFound().build(); // Retorna 404
        }
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> patchUser(@PathVariable Long id,
                                                     @Valid @RequestBody UserRequestDTO request){
        // 1. Validação básica
        if (id == null || request == null) {
            return ResponseEntity.badRequest().build();
        }

        // 2. Chama o service para atualizar
        UserResponseDTO updatedUser = service.update(id,request);

        // 3. Retorna o DTO atualizado
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        try {
            service.delete(id);
            return ResponseEntity.noContent().build(); // HTTP 204 (No Content)
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // HTTP 404 (Not Found)
        }
    }
}
