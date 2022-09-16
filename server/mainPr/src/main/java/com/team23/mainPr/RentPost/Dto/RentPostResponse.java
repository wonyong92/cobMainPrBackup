package com.team23.mainPr.RentPost.Dto;

import com.team23.mainPr.Dto.ParentCommonDto;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class RentPostResponse extends ParentCommonDto {

    private Integer id;
    private String contents;
    private String name;
    private ZonedDateTime writeDate;
    private ZonedDateTime updateDate;
}
