package com.team23.mainPr.Domain.Login.Controller;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String doLogin(@RequestBody DoLoginDto doLoginDto) {
        return loginService.doLogin(doLoginDto);
    }

    @PostMapping("/refeshToken")
    @ResponseStatus(HttpStatus.CREATED)
    public String refeshToken(@RequestParam String token) {
        return loginService.refreshToken(token);
    }

}
