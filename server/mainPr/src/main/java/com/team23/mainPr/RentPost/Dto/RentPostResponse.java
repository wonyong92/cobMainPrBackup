package com.team23.mainPr.RentPost.Dto;

import com.team23.mainPr.Dto.CommonDtoBoundary;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Id;
import java.time.LocalTime;

@Data
public class RentPostResponse extends CommonDtoBoundary {

    public Integer id;
    public String contents;
    public String name;
    public LocalTime writeDate;
    public LocalTime updateDate;
}
