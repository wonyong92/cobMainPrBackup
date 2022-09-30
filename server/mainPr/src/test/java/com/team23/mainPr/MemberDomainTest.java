package com.team23.mainPr;

import static org.assertj.core.api.Assertions.assertThat;

import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Login.Service.LoginService;
import com.team23.mainPr.Domain.Member.Controller.MemberController;
import com.team23.mainPr.Domain.Member.Dto.Request.CreateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Request.UpdateMemberDto;
import com.team23.mainPr.Domain.Member.Dto.Response.MemberProfileDto;
import com.team23.mainPr.Domain.Member.Entity.Member;
import com.team23.mainPr.Domain.Member.Mapper.MemberMapper;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Domain.Member.Service.MemberService;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

