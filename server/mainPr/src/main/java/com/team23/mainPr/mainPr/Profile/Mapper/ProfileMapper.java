package com.team23.mainPr.mainPr.Profile.Mapper;

import com.team23.mainPr.Profile.Dto.ProfileMappedDto;
import com.team23.mainPr.Profile.Entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileMappedDto ProfileToProfileResponse(Profile profile);
}
