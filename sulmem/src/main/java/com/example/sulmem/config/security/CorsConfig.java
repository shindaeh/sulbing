package com.example.sulmem.config.security;


import java.util.List;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//스프링 설정 
@Configuration
public class CorsConfig {
	
	@Bean("customCorsSource")
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		
		//클라이언트에서 쿠키/인증정보 포함 허용 (예: withCredentials: true 사용 시 필요)
		config.setAllowCredentials(true); 
	
		config.setAllowedOrigins(List.of("http://localhost:3000","http://127.0.0.1:3001","http://192.168.0.198:3000")); //프론트엔드 주소
		
		//origin 와일드카드 허용 (Spring 5.3+만 지원)
		//config.addAllowedOriginPattern("*"); // 와일드카드 허용 


		config.setAllowedMethods(List.of("GET","POST","PUT","DELETE", "OPTIONS")); //허용할 HTTP 메서드 지정
		config.setAllowedHeaders(List.of("*")); //모든 요청 헤더 허용
		
		// ✅ 브라우저에서 읽을 수 있도록 노출할 헤더 추가
        config.setExposedHeaders(List.of("Authorization", "Authorization-refresh"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);  //모든 경로에 대해 적용		
		return source;
	}
} //end class


/////////////////////////////////////////////////////////////


//@Configuration  //스프링 설정 클래스임을 나타냄
//public class CorsConfig {
//
////@Bean CorsFilter:	CORS 처리를 위한 필터를 스프링 빈으로 등록
//// CorsFilter:	모든 HTTP 요청에 대해 CORS 정책을 적용
//@Bean  
//public CorsFilter corsFilter() {      
//CorsConfiguration config = new CorsConfiguration();
//config.setAllowCredentials(true);
//config.setAllowedOrigins(List.of("http://localhost:3000","http://127.0.0.1:3000")); // 프론트엔드 주소
//config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//config.setAllowedHeaders(List.of("*"));
//
//UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//source.registerCorsConfiguration("/api/**", config);
//return new CorsFilter(source);
//}
//}




//CorsConfig보다 CorsConfigurationSource를 @Bean으로 등록하는 쪽이 Spring Security 6에서 가장 깔끔하고 호환성 높은 방식이다
/////////////////////////////////////////////////////






















