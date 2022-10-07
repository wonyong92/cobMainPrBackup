package com.team23.mainPr.Domain.RentHistory.Mapper;

import com.team23.mainPr.Domain.RentHistory.Dto.Request.CreateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDto;
import com.team23.mainPr.Domain.RentHistory.Entity.RentHistory;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RentHistoryMapper {

    List<RentHistoryResponseDto> RentHistorysToRentHistoryResponseDtos(List<RentHistory> rentHistorys);

    RentHistory CreateRentHistoryEntityDtoToRentHistory(CreateRentHistoryEntityDto dto);

    RentHistoryResponseDto RentHistoryToRentHistoryResponseDto(RentHistory created);

    RentHistory RentHistoryToRelatedRentHistory(RentHistory created);
}
