package com.example.api.users.validators.update;

import com.example.api.data.exceptions.ForbiddenException;
import com.example.api.data.exceptions.UnauthorizedException;
import com.example.api.data.validators.Validator;
import com.example.api.users.entities.UserEntity;
import com.example.api.users.enums.UserRolesEnum;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserCanUpdateValidator implements Validator<UpdateUserValidator> {
    @Override
    public void validate(UpdateUserValidator updateData) {
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!updateData.user().getId().equals(currentUser.getId()) && currentUser.getRole() != UserRolesEnum.ADMIN){
            throw new ForbiddenException("Você não tem permissão para editar esse usuário.");
        }
    }
}
