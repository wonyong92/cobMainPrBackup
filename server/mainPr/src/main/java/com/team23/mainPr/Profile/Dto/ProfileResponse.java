package com.team23.mainPr.Profile.Dto;

import com.team23.mainPr.Dto.CommonDtoBoundary;
import lombok.Data;

@Data
public class ProfileResponse extends CommonDtoBoundary {

    Integer id;
    String nickname;

}
