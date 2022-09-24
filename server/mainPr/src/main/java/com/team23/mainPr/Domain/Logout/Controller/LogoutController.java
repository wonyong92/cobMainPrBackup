package com.team23.mainPr.Domain.Logout.Controller;

import com.team23.mainPr.Domain.Login.Service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LogoutController {

    private final LoginService loginService;

    @Operation(description = "로그아웃, 200 상태코드만 응답")
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.CREATED)
    public void doLogout(@RequestHeader(value = "Authorization", required = false) String token) {
        loginService.doLogout(token);
    }
}
