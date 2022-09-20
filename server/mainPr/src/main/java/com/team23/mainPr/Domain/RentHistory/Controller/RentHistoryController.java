package com.team23.mainPr.Domain.RentHistory.Controller;

import com.team23.mainPr.Domain.RentHistory.Dto.Request.CreateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Request.UpdateRentHistoryEntityDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDto;
import com.team23.mainPr.Domain.RentHistory.Dto.Response.RentHistoryResponseDtos;
import com.team23.mainPr.Domain.RentHistory.Service.RentHistoryService;
import com.team23.mainPr.Global.Dto.ChildCommonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/rentHistory")
@RequiredArgsConstructor
public class RentHistoryController {

    private final RentHistoryService rentHistoryService;

    @GetMapping("/receive")
    public RentHistoryResponseDtos getReceiveRentHistoryData(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return rentHistoryService.getReceiveRentHistory(memberId);
    }

    @GetMapping("/send")
    public RentHistoryResponseDtos getSendRentHistoryData(@RequestParam @Valid @Min(value = 1) Integer memberId) {
        return rentHistoryService.getSendRentHistory(memberId);
    }

    @PostMapping("/post")
    public RentHistoryResponseDto createRentHistoryData(@RequestBody @Valid CreateRentHistoryEntityDto createRentHistoryEntityDto) {
        return rentHistoryService.createRentHistory(createRentHistoryEntityDto);
    }

    @PutMapping
    public ResponseEntity<ChildCommonDto<RentHistoryResponseDto>> updateRentHistoryData(@RequestBody @Valid UpdateRentHistoryEntityDto updateRentHistoryDto) {

        ChildCommonDto<RentHistoryResponseDto> response = rentHistoryService.updateRentHistoryData(updateRentHistoryDto);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping("/delete/{rentHistoryId}")
    public String delete(@PathVariable Integer rentHistoryId) {

        return rentHistoryService.deleteRentHistory(rentHistoryId);
    }
}
