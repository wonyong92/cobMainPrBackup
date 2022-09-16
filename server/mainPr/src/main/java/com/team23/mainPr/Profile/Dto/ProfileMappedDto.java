package com.team23.mainPr.Profile.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;
import lombok.Data;

@Data
public class ProfileMappedDto extends ParentCommonDto {

    Integer id;
    String nickname;

}
