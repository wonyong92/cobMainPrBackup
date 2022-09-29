package com.team23.mainPr.Domain.Login.Controller;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @Operation(description = "로그인 기능, 응답 헤더 Authorization 키에 토큰 반환")
    @PostMapping(produces = "application/json; charset=utf-8")
    @ResponseStatus(HttpStatus.CREATED)
    public void doLogin(
        @RequestBody DoLoginDto doLoginDto, HttpServletResponse response) {
        String[] result = loginService.doLogin(doLoginDto);
        response.setHeader("Authorization", result[0]);

    }

    @Operation(description = "토큰 재발급, 응답 헤더 Authorization 키에 토큰 반환")
    @PostMapping("/refeshToken")
    @ResponseStatus(HttpStatus.CREATED)
    public void refeshToken(
        @RequestHeader(value = "Authorization", required = false) String token, HttpServletResponse response) {
        response.setHeader("Authorization", loginService.refreshToken(token));
    }
}
