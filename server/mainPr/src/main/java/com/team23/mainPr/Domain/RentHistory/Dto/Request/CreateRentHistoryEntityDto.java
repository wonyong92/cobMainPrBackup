package com.team23.mainPr.Domain.RentHistory.Dto.Request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

/**
 * rentStartDate : ISO 8601 형식 사용 ex)2018-07-18T15:16:33.647+09:00
 */

@Data
public class CreateRentHistoryEntityDto {
    //Bean Validation 을 이용하여 컨트롤러에서 바로 잘못된 요청을 검출 할 수 있도록 구성하였다.
    @NotNull(message = "targetMemberId must not be null")
    Integer targetMemberId;
    @NotNull(message = "rentStartDate must not be null")
    ZonedDateTime rentStartDate;
    @NotNull(message = "rentEndDate must not be null")
    ZonedDateTime rentEndDate;
    @NotNull(message = "requesterId must not be null")
    Integer requesterId;
    String msg = "nothing";
    @NotNull(message = "targetPosId must not be null")
    Integer targetPosId;

}
