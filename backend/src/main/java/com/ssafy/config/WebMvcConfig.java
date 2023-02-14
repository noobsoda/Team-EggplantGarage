package com.ssafy.config;

import com.ssafy.common.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InjectionPoint;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuration.addAllowedOrigin("*");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader(JwtTokenUtil.HEADER_STRING);
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/WEB-INF/resources/");

        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        /*
         *
         * Front-end에서 참조하는 URL을 /dist로 매핑
         *
         */
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/dist/static/");
        registry.addResourceHandler("/image/**")
                .addResourceLocations("classpath:/dist/image/");
        registry.addResourceHandler("/index.html")
                .addResourceLocations("classpath:/dist/index.html");
        registry.addResourceHandler("/asset-manifest.json")
                .addResourceLocations("classpath:/dist/asset-manifest.json");
        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/dist/favicon.ico");
        registry.addResourceHandler("/gazi.ico")
                .addResourceLocations("classpath:/dist/gazi.ico");
        registry.addResourceHandler("/logo192.png")
                .addResourceLocations("classpath:/dist/logo192.png");
        registry.addResourceHandler("/logo512.png")
                .addResourceLocations("classpath:/dist/logo512.png");
        registry.addResourceHandler("/manifest.json")
                .addResourceLocations("classpath:/dist/manifest.json");
        registry.addResourceHandler("/robots.txt")
                .addResourceLocations("classpath:/dist/robots.txt");
        /*registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/dist/");*/

    }

    public Filter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(true);
        loggingFilter.setMaxPayloadLength(64000);
        return loggingFilter;
    }

    @Bean
    public FilterRegistrationBean loggingFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(requestLoggingFilter());
        registration.addUrlPatterns("/api/*");
        return registration;
    }

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    Logger logger(InjectionPoint injectionPoint) {
        return LoggerFactory.getLogger((injectionPoint.getMethodParameter().getContainingClass()));
    }
}
