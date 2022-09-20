package com.team23.mainPr.Domain.RentHistory.Service;

import com.team23.mainPr.Domain.RentHistory.Dto.Request.CreateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Request.UpdateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDtos;
import com.team23.mainPr.Domain.RentHistory.Entity.RentHistory;
import com.team23.mainPr.Domain.RentHistory.Mapper.RentHistoryMapper;
import com.team23.mainPr.Domain.RentHistory.Repository.RentHistoryRepository;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.DefaultTimeZone;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.team23.mainPr.Global.CustomException.ErrorData.BAD_REQUEST;
import static com.team23.mainPr.Global.Enum.ChildCommonDtoMsgList.SUCCESS;

/**
 * <pre>
 * ZonedDateTime 관련해서 jackson이 제대로 역직렬화를 하지 못하는 상황 발생
 * spring.jackson.deserialization.ADJUST_DATES_TO_CONTEXT_TIME_ZONE= false
 * 설정을 yml 혹은 properties 에 추가하여 iso8061 포맷을 사용 하도록 하였다.
 * json 데이터 예시 : "rentEndDate":"2018-07-18T15:16:33.647+09:00"
 * </pre>
 */

@Service
@RequiredArgsConstructor
public class RentHistoryService {

    private final RentHistoryRepository rentHistoryRepository;
    private final RentHistoryMapper rentHistoryMapper;
    private final DefaultTimeZone defaultTimeZone;

    public RentHistoryResponseDtos getReceiveRentHistory(Integer memberId) {

        List<RentHistoryResponseDto> responses = rentHistoryMapper.RentHistorysToRentHistoryResponseDtos(
                rentHistoryRepository.findByTargetMemberIdAndRentDataTypeTrue(memberId).orElseThrow());

        return new RentHistoryResponseDtos(responses);
    }

    public RentHistoryResponseDtos getSendRentHistory(Integer memberId) {

        List<RentHistoryResponseDto> responses = rentHistoryMapper.RentHistorysToRentHistoryResponseDtos(
                rentHistoryRepository.findByRequesterIdAndRentDataTypeFalse(memberId).orElseThrow());

        return new RentHistoryResponseDtos(responses);
    }

    public RentHistoryResponseDto createRentHistory(CreateRentHistoryEntityDto dto) {

        //유스케이스1 : 요청 요구자와 요청 수신자가 같으면 안된다.
        if (dto.getTargetMemberId().equals(dto.getRequesterId()))
            throw new CustomException(BAD_REQUEST);

        RentHistory rentHistory = rentHistoryMapper.CreateRentHistoryEntityDtoToRentHistory(dto);
        RentHistory created = rentHistoryRepository.save(rentHistory);

        RentHistory relatedRentHistory = rentHistoryMapper.RentHistoryToRelatedRentHistory(created);
        rentHistoryRepository.save(relatedRentHistory);

        relatedRentHistory.setRelateRentHistory(created.getRentHistoryId());
        created.setRelateRentHistory(relatedRentHistory.getRentHistoryId());
        rentHistoryRepository.flush();

        return rentHistoryMapper.RentHistoryToRentHistoryResponseDto(created);
    }

    public String deleteRentHistory(Integer rentHistoryId) {

        rentHistoryRepository.delete(rentHistoryRepository.getReferenceById(rentHistoryId));

        return SUCCESS.getMsg();
    }

    public RentHistoryResponseDto updateRentHistoryData(UpdateRentHistoryEntityDto dto) {

        RentHistory rentHistory = rentHistoryRepository.getReferenceById(dto.getRentHistoryId());
        RentHistory relatedRentHistory = rentHistoryRepository.getReferenceById(rentHistory.getRelateRentHistory());

        RentHistory updatedRentHistory = dto.updateData(rentHistory, dto);
        RentHistory updatedRelatedRentHistory = dto.updateData(relatedRentHistory, dto);

        //렌트 수락/거절 기능 : 렌트 요청 타입이 Receive(RentDataType = TRUE) 일때만 수락, 거절 선택 가능
        if (updatedRentHistory.getRentDataType().equals(Boolean.TRUE) && updatedRentHistory.getRentStatus().equals("not selected")) {
            updatedRentHistory.setRentStatus(dto.getRentStatus());
            updatedRelatedRentHistory.setRentStatus(dto.getRentStatus());//연결된 요청 데이터도 수락/거절 상태 변경
        }

        rentHistoryRepository.flush();

        return rentHistoryMapper.RentHistoryToRentHistoryResponseDto(rentHistory);
    }
}
