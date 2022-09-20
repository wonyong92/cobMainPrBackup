package com.team23.mainPr.Domain.RentHistory.Dto.Response;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class RentHistoryResponseDto {

    Integer rentHistoryId;
    Integer targetMemberId;
    boolean rentDataType;
    String rentStatus = "not selected";
    ZonedDateTime rentStartDate;
    ZonedDateTime rentEndDate;
    Integer requesterId;
    String msg;
    Integer targetPosId;
    ZonedDateTime createdTime;
    ZonedDateTime updateTime;

}
