package com.team23.mainPr.Domain.RentHistory.Controller;

import com.team23.mainPr.Domain.RentHistory.Dto.Request.CreateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Request.UpdateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDtos;
import com.team23.mainPr.Domain.RentHistory.Service.RentHistoryService;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
//메소드 단위로 개별 응답을 사용하면서 RestController 로 통일
@RestController
@RequestMapping("/rentHistory")
@RequiredArgsConstructor
public class RentHistoryController {

    private final RentHistoryService rentHistoryService;
    //응답 데이터 클래스를 구현해 놓은 DTO 클래스를 이용하도록 구성
    //Bean Validation 을 이용하여 컨트롤러에서 바로 요청 데이터를 검증, 서비스 레이어에서 요청의 입력 값을 검증하는 if 문을 모두 삭제 할 수 있었다.
    @GetMapping("/receive")
    public RentHistoryResponseDtos getReceiveRentHistoryData(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return rentHistoryService.getReceiveRentHistory(memberId);
    }

    @GetMapping("/send")
    public RentHistoryResponseDtos getSendRentHistoryData(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return rentHistoryService.getSendRentHistory(memberId);
    }
    //기본적으로 모든 정상 응답은 200으로 처리, 필요한 경우에 대해서만 별도로 상태 코드 설정
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post")
    public RentHistoryResponseDto createRentHistoryData(@RequestBody @Valid CreateRentHistoryEntityDto createRentHistoryEntityDto) {
        return rentHistoryService.createRentHistory(createRentHistoryEntityDto);
    }

    @PutMapping
    public RentHistoryResponseDto updateRentHistoryData(@RequestBody @Valid UpdateRentHistoryEntityDto updateRentHistoryDto) {
        return rentHistoryService.updateRentHistoryData(updateRentHistoryDto);
    }

    @PostMapping("/delete/{rentHistoryId}")
    public String delete(@PathVariable Integer rentHistoryId) {
        return rentHistoryService.deleteRentHistory(rentHistoryId);
    }
}
