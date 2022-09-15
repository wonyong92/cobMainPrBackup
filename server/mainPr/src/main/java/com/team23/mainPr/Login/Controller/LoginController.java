package com.team23.mainPr.Login.Controller;

import com.team23.mainPr.Dto.CommonDto;
import com.team23.mainPr.Login.Dto.DoLoginDto;
import com.team23.mainPr.Login.Service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity doLogin(@RequestBody DoLoginDto dto)
    {

        CommonDto response = loginService.doLogin(dto);

        if (!response.getMsg().contains("not matched") && !response.getMsg().equals("Error"))
            return new ResponseEntity(response, HttpStatus.OK);
        else
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }
}
