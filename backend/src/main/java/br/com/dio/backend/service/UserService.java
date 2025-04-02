package br.com.dio.backend.service;

import br.com.dio.backend.model.dto.UserRequestDTO;
import br.com.dio.backend.model.dto.UserResponseDTO;

public interface UserService {

    UserResponseDTO findByEmail(String email);

    UserResponseDTO create(UserRequestDTO requestDTO);

    UserResponseDTO update(Long id, UserRequestDTO requestDTO);

    boolean checkEmail(String email);
    void delete(Long id);
}
