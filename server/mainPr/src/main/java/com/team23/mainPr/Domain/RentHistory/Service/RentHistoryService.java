package com.team23.mainPr.Domain.RentHistory.Service;

import static com.team23.mainPr.Global.CustomException.ErrorData.BAD_REQUEST;

import com.team23.mainPr.Domain.RentHistory.Dto.Request.CreateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Request.UpdateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDtos;
import com.team23.mainPr.Domain.RentHistory.Entity.RentHistory;
import com.team23.mainPr.Domain.RentHistory.Mapper.RentHistoryMapper;
import com.team23.mainPr.Domain.RentHistory.Repository.RentHistoryRepository;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.DefaultTimeZone;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void deleteRentHistory(Integer rentHistoryId) {

        rentHistoryRepository.delete(rentHistoryRepository.getReferenceById(rentHistoryId));
    }

    public RentHistoryResponseDtos getReceiveRentHistory(Integer memberId) {
        return new RentHistoryResponseDtos(rentHistoryMapper.RentHistorysToRentHistoryResponseDtos(
            rentHistoryRepository.findByTargetMemberIdAndRentDataTypeTrue(memberId)));
    }

    public RentHistoryResponseDtos getSendRentHistory(Integer memberId) {

        List<RentHistoryResponseDto> responses = rentHistoryMapper.RentHistorysToRentHistoryResponseDtos(
            rentHistoryRepository.findByRequesterIdAndRentDataTypeFalse(memberId));
        // 생성자에 바로 리스트를 리턴하는 내용을 넣을 수 있지만 너무 길어져서 가독성에 좋지 않아보여 별도로 객체 생성하도록 구성
        return new RentHistoryResponseDtos(responses);
    }

    public RentHistoryResponseDto createRentHistory(CreateRentHistoryEntityDto dto) {
        // 간단한 유스케이스에 대해서만 if문 을 이용하였다. 복잡한 유스케이스는 백엔드에서 처리할 내용이 아닌 경우가 많았다.
        // 유스케이스1 : 요청 요구자와 요청 수신자가 같으면 안된다.
        if (dto.getTargetMemberId().equals(dto.getRequesterId())) {
            throw new CustomException(BAD_REQUEST);
        }

        RentHistory rentHistory = rentHistoryMapper.CreateRentHistoryEntityDtoToRentHistory(dto);
        RentHistory created = rentHistoryRepository.save(rentHistory);

        RentHistory relatedRentHistory = rentHistoryMapper.RentHistoryToRelatedRentHistory(created);
        rentHistoryRepository.save(relatedRentHistory);

        relatedRentHistory.setRelateRentHistory(created.getRentHistoryId());
        created.setRelateRentHistory(relatedRentHistory.getRentHistoryId());
        rentHistoryRepository.flush();

        return rentHistoryMapper.RentHistoryToRentHistoryResponseDto(created);
    }

    public RentHistoryResponseDto updateRentHistoryData(UpdateRentHistoryEntityDto dto) {
        // getReferenceById 를 사용하여 getReferenceById 내부의 에러 throw 를 이용, if문 대신 컨트롤러 예외 핸들러가 작동하도록 구성
        RentHistory rentHistory = rentHistoryRepository.getReferenceById(dto.getRentHistoryId());
        RentHistory relatedRentHistory = rentHistoryRepository.getReferenceById(
            rentHistory.getRelateRentHistory());

        // 수정 사항 변경은 DTO에서 한번에 처리하는 게 효율적이므로 결정하므로 DTO에 필드값 업데이트용 메소드(updateData) 생성 및 사용
        RentHistory updatedRentHistory = dto.updateData(rentHistory, dto);
        RentHistory updatedRelatedRentHistory = dto.updateData(relatedRentHistory, dto);

        // 조건에 따라 데이터 변경이 필요한 경우는 따로 분리하여 서비스 메소드에서 직접 수행
        // 렌트 수락/거절 기능 : 렌트 요청 타입이 Receive(RentDataType = TRUE) 일때만 수락, 거절 선택 가능
        if (updatedRentHistory.getRentDataType().equals(
            Boolean.TRUE) && updatedRentHistory.getRentStatus().equals("not selected")) {
            updatedRentHistory.setRentStatus(dto.getRentStatus());
            updatedRelatedRentHistory.setRentStatus(dto.getRentStatus()); // 연결된 요청 데이터도 수락/거절 상태 변경
        }

        rentHistoryRepository.flush();
        // DTO 를 응답객체로 사용하여 컨트롤러-서비스 결합도?를 낮춤
        return rentHistoryMapper.RentHistoryToRentHistoryResponseDto(rentHistory);
    }
}
