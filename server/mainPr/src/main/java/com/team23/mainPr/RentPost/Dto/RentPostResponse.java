package com.team23.mainPr.RentPost.Dto;

import com.team23.mainPr.Dto.CommonDtoBoundary;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class RentPostResponse extends CommonDtoBoundary {

    public Integer id;
    public String contents;
    public String name;
    public ZonedDateTime writeDate;
    public ZonedDateTime updateDate;
}
