package com.example.sulmem.config.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;


import com.example.sulmem.config.jwt.JwtAuthenticationFilter;
import com.example.sulmem.config.jwt.JwtAuthorizationFilter;
import com.example.sulmem.config.jwt.JwtTokenProvider;
import com.example.sulmem.members.repository.MembersRepository;
import com.example.sulmem.members.service.AuthService;


//[1] POSTMAN에서 테스트
//POST http://localhost:8090/login
//body, raw , json  => {"memberEmail":"dong@google.com", "memberPass":"1234"}


//해당 클래스를 Configuration으로 등록 : 환경설정
@Configuration
@EnableWebSecurity // Spring Security가 Spring FileChain에 등록함 (즉 스프링 시큐리티를 활성화함)
//메소드 수준에서 보안을 활성화한다. 이를 통해 @PreAuthorize나 @PostAuthorize를 사용하여 메소드 실행 전후에 인증 및 권한 체크를 추가할 수 있다.
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {


	@Autowired
	private MembersRepository membersRepository;


	// @Autowired
	// private CorsConfig corsConfig;


	@Autowired
	@Qualifier("customCorsSource")
	private CorsConfigurationSource corsSource;


	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Autowired
	private AuthenticationConfiguration authenticationConfiguration;


	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	JwtTokenProvider jwtTokenProvider;


	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


		// 사전 초기화
		AuthenticationManager authenticationManager = authenticationManagerBean();


		// [1] CSRF 보호 비활성화 (REST API 방식에서는 일반적으로 비활성화)
		// csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로 정상적인 사용자가 의도치 않은
		// 위조 요청을 보내는 것을 의미한다.
		// http.csrf((csrf) -> csrf.disable());


		// Spring Boot 3.XX에서 권장
		http.csrf(AbstractHttpConfigurer::disable);


		// [2] CORS 필터 등록 (요청 출처 도메인 제어 등 처리)
		http.cors(cors -> cors.configurationSource(corsSource)); // CORS


		// [3] 기본 제공 로그인 폼 사용 비활성화 (커스텀 인증 방식 사용)
		http.formLogin(formLogin -> formLogin.disable());


		// [4]세션 관리 설정
		// 인증사용, Security Filter에 등록 , @CrossOrigin (인증X)
		// 세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
		http.sessionManagement(sessionManagement ->
		// 세션을 생성하지 않고, 기존 세션도 사용하지 않음 (JWT 기반 무상태(stateless) 인증 방식 사용)
		sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


		// [5] 요청에 의한 권한 설정검사 시작
		http.authorizeHttpRequests(authorize -> authorize
				// 특정 URL은 인증 없이 허용
				// .requestMatchers("/api/v1/home", "/api/v1/join", "/api/v1/login").permitAll()
				.requestMatchers("/", "/images/**", "/member/signup", "/board/list/**", "/board/view/**","/auth/refresh","/board/contentdownload/**").permitAll()
				// 그외 모든 요청에 대해서 인증(로그인)이 되어야 한다.
				.anyRequest().authenticated());


		// addFilter() : FilterComparator에 등록되어 있는 Filter들을 활성화할 때 사용
		// addFilterBefore(), addFilterAfter() : CustomFilter를 등록할 때 사용
		// Bean 등록 방식 대신 SecurityFilterChain 안에서 직접 JwtAuthenticationFilter 객체를 생성하고
		// 필터에 등록하는 방식으로 변경하는 것이 Spring Security 6 기준으로 가장 안정적방법이다.


		// [6] 인증 필터 위치 설정
		// UsernamePasswordAuthenticationFilter 위치에 커스텀 JWT 인증
		// 필터(jwtAuthenticationFilter) 등록
		JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, authService, jwtTokenProvider);
		http.addFilter(jwtAuthenticationFilter);


		// [7] 인가 필터 등록 (JWT 토큰이 유효한지 확인하고, 권한 처리)
		JwtAuthorizationFilter jwtAuthorizationFilter = 
				new JwtAuthorizationFilter(authenticationManager,	membersRepository);
		http.addFilter(jwtAuthorizationFilter);


		return http.build();
	}
}// end class


/*
 * Spring Boot 내부적으로 CorsConfigurationSource 타입의 Bean이 이미 하나 존재하고, 사용자가 별도로 또 하나
 * 정의했기 때문에 2개 중 어떤 것을 주입해야 하는지 결정하지 못해 오류가 발생한다.
 * 
 * => Spring Boot 내부 등록된 mvcHandlerMappingIntrospector Bean도
 * CorsConfigurationSource를 구현하고 있기 때문에 충돌이 난다.
 * 
 * => 해결 방법 2가지 중 선택 방법 1: @Qualifier로 원하는 Bean을 명시하기 (권장) 만약 CorsConfig 클래스에서
 * 직접 정의한 Bean을 사용하고 싶다면 아래처럼 Qualifier를 명시적으로 지정하세요.
 * 
 * 1. CorsConfig 클래스에서 @Bean 이름을 지정:
 * 
 * /* Spring Boot 내부적으로 CorsConfigurationSource 타입의 Bean이 이미 하나 존재하고, 사용자가 별도로 또
 * 하나 정의했기 때문에 2개 중 어떤 것을 주입해야 하는지 결정하지 못해 오류가 발생한다.
 * 
 * => Spring Boot 내부 등록된 mvcHandlerMappingIntrospector Bean도
 * CorsConfigurationSource를 구현하고 있기 때문에 충돌이 난다.
 * 
 * => 해결 방법 2가지 중 선택 [방법 1]: @Qualifier로 원하는 Bean을 명시하기 (권장) 만약 CorsConfig 클래스에서
 * 직접 정의한 Bean을 사용하고 싶다면 아래처럼 Qualifier를 명시적으로 지정하세요.
 * 
 * (1) CorsConfig 클래스에서 @Bean 이름을 지정:
 * 
 * @Configuration public class CorsConfig {
 * 
 * @Bean("customCorsSource") public CorsConfigurationSource
 * corsConfigurationSource() { }
 * 
 * (2) SecurityConfig에서 @Qualifier 명시:
 * 
 * @Autowired
 * 
 * @Qualifier("customCorsSource") private CorsConfigurationSource corsSource;
 * 
 * [방법 2]: @Primary로 우선순위 지정 (이전 코드 유지 가능)
 * 
 * @Configuration public class CorsConfig {
 * 
 * @Bean
 * 
 * @Primary public CorsConfigurationSource corsConfigurationSource() { }
 * 
 * @Qualifier("beanName") 명시적이어서 가장 안전함, @Primary 전역 우선순위, 코드 단순하다.
 */




