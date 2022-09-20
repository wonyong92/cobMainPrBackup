package com.team23.mainPr.Domain.RentHistory.Dto.Request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.team23.mainPr.Domain.RentHistory.Entity.RentHistory;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateRentHistoryEntityDto {

    @NotNull(message = "rentHistoryId must not be null")
    @Min(value = 1, message = "rentHistoryId must be lager than 1")
    Integer rentHistoryId;
    @NotNull(message = "rentStatus must not be null")
    String rentStatus;
    @NotNull(message = "rentStartDate must not be null")
    ZonedDateTime rentStartDate;
    @NotNull(message = "rentEndDate must not be null")
    ZonedDateTime rentEndDate;
    @NotNull(message = "msg must not be null")
    String msg;

    public RentHistory updateData(RentHistory rentHistory, UpdateRentHistoryEntityDto dto) {

        rentHistory.setRentStartDate(dto.getRentStartDate());
        rentHistory.setRentEndDate(dto.getRentEndDate());
        rentHistory.setMsg(dto.getMsg());

        return rentHistory;
    }

}
