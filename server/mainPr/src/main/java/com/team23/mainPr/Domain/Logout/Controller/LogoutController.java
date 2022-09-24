package com.team23.mainPr.Domain.Logout.Controller;

import com.team23.mainPr.Domain.Login.Service.LoginService;
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

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.CREATED)
    public void doLogout(
        @RequestHeader(value = "Authorization")
        String token) {
        loginService.doLogout(token);
    }
}
