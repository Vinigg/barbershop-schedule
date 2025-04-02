package br.com.dio.backend.model.mapper;

import br.com.dio.backend.model.dto.UserRequestDTO;
import br.com.dio.backend.model.dto.UserResponseDTO;
import br.com.dio.backend.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    User toEntity(UserRequestDTO dto);

    UserResponseDTO toDTO(User entity);
}
