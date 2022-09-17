package com.team23.mainPr;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    Login createMap(CreateLoginDto dto);
}
