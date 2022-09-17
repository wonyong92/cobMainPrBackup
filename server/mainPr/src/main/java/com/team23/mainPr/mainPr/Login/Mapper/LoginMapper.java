package com.team23.mainPr.mainPr.Login.Mapper;

import com.team23.mainPr.Login.Dto.CreateLoginDto;
import com.team23.mainPr.Login.Entity.Login;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    Login createMap(CreateLoginDto dto);
}
