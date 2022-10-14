package com.team23.mainPr.Global.Interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.team23.mainPr.Domain.Comment.Repository.CommentRepository;
import com.team23.mainPr.Domain.Login.Repository.LoginRepository;
import com.team23.mainPr.Domain.Member.Repository.MemberRepository;
import com.team23.mainPr.Domain.RentPost.Repository.RentPostRepository;
import com.team23.mainPr.Global.CommonMethod.MemberIdExtractorFromJwt;
import com.team23.mainPr.Global.CustomException.CustomException;
import com.team23.mainPr.Global.CustomException.ErrorData;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class Interceptor implements HandlerInterceptor {

    @Autowired MemberIdExtractorFromJwt memberIdExtractorFromJwt;
    @Autowired LoginRepository loginRepository;
    @Autowired RentPostRepository rentPostRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired CommentRepository commentRepository;
    @Transactional
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Login annotation = handlerMethod.getMethodAnnotation(Login.class);
        if (annotation == null) {
            return true;
        }
        String token = request.getHeader("Authorization");

        DecodedJWT jwt = JWT.decode(token.replace("Bearer ", ""));
        if( jwt.getExpiresAt().before(new Date())) {
            throw new CustomException(ErrorData.EXPIRED_TOKEN_ERROR);
        }


        loginRepository.findByToken(token).ifPresentOrElse(login -> {
            if (login.getLogouted()) {
                throw new CustomException(ErrorData.NOT_EXIST_LOGIN_INFORMATION);
            }

        }, () -> {
            throw new CustomException(ErrorData.NOT_EXIST_LOGIN_INFORMATION);
        });

        Integer tokenData = memberIdExtractorFromJwt.getMemberId(token);

        if (request.getParameter("postId") != null && !tokenData.equals(rentPostRepository.getReferenceById(Integer.parseInt(request.getParameter("postId"))).getWriterId())) {
            response.setStatus(403);
            return false;
        }

        if (request.getParameter("comment") != null && !tokenData.equals(commentRepository.getReferenceById(Integer.parseInt(request.getParameter("commentId"))).getWriterId())) {
            response.setStatus(403);
            return false;
        }

        String referer = request.getHeader("Referer");
        String host = request.getHeader("Host");
        String origin = request.getHeader("Origin");

//        if (referer == null || !referer.contains(host)) {
//            response.setStatus(403);
//            System.out.println(host);
//            System.out.println(referer);
//            return false;
//        }

        return true;
    }
}
