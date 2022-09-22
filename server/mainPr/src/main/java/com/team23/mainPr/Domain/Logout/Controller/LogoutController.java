package com.team23.mainPr.Domain.Logout.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.team23.mainPr.Domain.Login.Service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LogoutController {

	private final LoginService loginService;

	@PostMapping("/logout")
	@ResponseStatus(HttpStatus.CREATED)
	public String doLogout(@RequestParam String token) {
		return loginService.doLogout(token);
	}
}
