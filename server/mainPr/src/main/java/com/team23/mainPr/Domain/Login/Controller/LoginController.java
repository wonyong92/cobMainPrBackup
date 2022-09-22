package com.team23.mainPr.Domain.Login.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.team23.mainPr.Domain.Login.Dto.Request.DoLoginDto;
import com.team23.mainPr.Domain.Login.Service.LoginService;

import lombok.RequiredArgsConstructor;

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
