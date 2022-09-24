package com.team23.mainPr.Global.Interceptor;

import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class Interceptor implements HandlerInterceptor {

    @Autowired
    MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    @Autowired
    LoginRepository loginRepository;
    @Autowired
    RentPostRepository rentPostRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    CommentRepository commentRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) throws Exception {
        // 1. handler 종류 확인
        // 우리가 관심 있는 것은 Controller에 있는 메서드이므로 HandlerMethod 타입인지 체크
        if (handler instanceof HandlerMethod == false) {
            // return true이면  Controller에 있는 메서드가 아니므로, 그대로 컨트롤러로 진행
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;

        Login annotation = handlerMethod.getMethodAnnotation(Login.class);

        if (annotation == null) {
            return true;
        }

        String token = request.getHeader("Authorization");

        loginRepository.findByToken(token).ifPresentOrElse(login -> {
            if (login.getLogouted()) {
                throw new CustomException(ErrorData.NOT_EXIST_LOGIN_INFORMATION);
            }

        }, () -> {
            throw new CustomException(ErrorData.NOT_EXIST_LOGIN_INFORMATION);
        });

        Integer tokenData = memberIdExtractorFromJwt.getMemberId(token);

        /**
         * 1. 토큰 해석값 = 요청 유저 아이디 확인 + 로그인 상태 확인 - 유저 정보 수정, 유저 정보 삭제
         * 2. 토큰 해석값 = 요청 포스트 주인 확인 + 로그인 상태 확인 - 포스트 수정, 삭제
         * 3. 토큰 해석값 = 요청 댓글 주인 확인 + 로그인 상태 확인 - 댓글 수정, 삭제
         * */

        if (request.getParameter("memberId") != null
            && tokenData != memberRepository.getReferenceById(
            Integer.parseInt(request.getParameter("memberId"))).getMemberId()) {
            response.setStatus(403);
            return false;
        }

        if (request.getParameter("postId") != null
            && tokenData != rentPostRepository.getReferenceById(
            Integer.parseInt(request.getParameter("postId"))).getWriterId()) {
            response.setStatus(403);
            return false;
        }

        if (request.getParameter("comment") != null
            && tokenData != commentRepository.getReferenceById(
            Integer.parseInt(request.getParameter("commentId"))).getWriterId()) {
            response.setStatus(403);
            return false;
        }

        return true;
    }
}
