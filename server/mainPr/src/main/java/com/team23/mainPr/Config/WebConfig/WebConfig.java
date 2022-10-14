package com.team23.mainPr.Config.WebConfig;

import com.team23.mainPr.Global.Interceptor.Interceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <pre>
 * feat:cors 모두 열어 놓기
 * </pre>
 */
@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final Interceptor interceptor;
    @Value("${aws.s3.url}") String s3Url;
    @Value("${front.url}") String frontUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").exposedHeaders("Authorization").allowedMethods("*").allowCredentials(false).allowedHeaders("*").allowedOrigins(s3Url,frontUrl,"http://localhost:8080","http://localhost:3000");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/swagger-ui.html**").addResourceLocations("classpath:/swagger-ui.html");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor);
    }

}
