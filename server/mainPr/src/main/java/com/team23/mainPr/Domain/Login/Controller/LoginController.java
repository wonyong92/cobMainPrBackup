package com.team23.mainPr.Domain.Login.Controller;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Service.LoginService;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void doLogin(
        @RequestBody
        DoLoginDto doLoginDto, HttpServletResponse response) {
        response.setHeader("Authorization", loginService.doLogin(doLoginDto));
    }

    @PostMapping("/refeshToken")
    @ResponseStatus(HttpStatus.CREATED)
    public String refeshToken(
        @RequestHeader(value = "Authorization")
        String token) {
        return loginService.refreshToken(token);
    }
}
