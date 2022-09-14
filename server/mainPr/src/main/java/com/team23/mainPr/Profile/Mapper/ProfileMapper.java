package com.team23.mainPr.Profile.Mapper;

import com.team23.mainPr.Profile.Dto.ProfileResponse;
import com.team23.mainPr.Profile.Entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileResponse ProfileToProfileResponse(Profile profile);
}
