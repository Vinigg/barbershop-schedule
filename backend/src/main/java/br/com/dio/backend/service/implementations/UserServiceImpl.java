package br.com.dio.backend.service.implementations;

import br.com.dio.backend.exceptions.BusinessRuleException;
import br.com.dio.backend.model.dto.UserRequestDTO;
import br.com.dio.backend.model.dto.UserResponseDTO;
import br.com.dio.backend.model.entity.User;
import br.com.dio.backend.model.mapper.UserMapper;
import br.com.dio.backend.repository.UserRepository;
import br.com.dio.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserMapper mapper;


    @Override
    public UserResponseDTO findByEmail(String email) {
        User userFound = repository.findByEmail(email);
        return mapper.toDTO(userFound);
    }

    @Override
    public UserResponseDTO create(UserRequestDTO requestDTO) {
        if (repository.existsByEmail(requestDTO.getEmail())) {
            throw new BusinessRuleException("Já existe um usuário com este e-mail.");
        }
        User entity = mapper.toEntity(requestDTO);
        User savedEntity = repository.save(entity);

        return mapper.toDTO(savedEntity);
    }

    @Override
    public UserResponseDTO update(Long id, UserRequestDTO requestDTO) {

        // 1. Busca o user existente
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // 2. Atualiza apenas os campos
        existingUser.setEmail(requestDTO.getEmail());
        existingUser.setName(requestDTO.getName());
        existingUser.setPassword(requestDTO.getPassword());

        // 3. Salva e retorna o DTO atualizado
        User updatedUser = repository.save(existingUser);

        return mapper.toDTO(updatedUser);
    }

    @Override
    public boolean checkEmail(String email) {
        return repository.existsByEmail(email);

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
