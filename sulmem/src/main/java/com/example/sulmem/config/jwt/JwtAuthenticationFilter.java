package com.example.sulmem.config.jwt;


import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.sulmem.config.auth.PrincipalDetails;
import com.example.sulmem.members.dto.AuthInfo;
import com.example.sulmem.members.dto.MembersDTO;
import com.example.sulmem.members.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;


// Authentication(인증)
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private AuthenticationManager authManager;
	private Authentication authentication;	
	
	private AuthService authService;
	
	
	private JwtTokenProvider jwtTokenProvider;
	
	public JwtAuthenticationFilter(AuthenticationManager authManager,AuthService authService, JwtTokenProvider jwtTokenProvider) {
		this.authManager = authManager;
		this.authService = authService;
		this.jwtTokenProvider =jwtTokenProvider;
	}
	
	// http://localhost:8090/login
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		log.info("JwtAuthenticationFilter => attemptAuthentication() => login 요청 처리를 시작함 ");
		
		try {
//			BufferedReader br = request.getReader();
//			String input = null;
//			while((input = br.readLine()) != null) {
//				log.info("readLine() => {}", input);
//			}
			
			//{"memberEmail": "dong@google.com", "memberPass":"1234"}
			// 스트림을 통해서 읽어온 json을 MembersdTO 객체로 변경한다.
			ObjectMapper om = new ObjectMapper();
			MembersDTO membersDTO = om.readValue(request.getInputStream(), MembersDTO.class);
			log.info("memberEmail:{}, memberPass:{}", 
					membersDTO.getMemberEmail(), membersDTO.getMemberPass());
			
			UsernamePasswordAuthenticationToken authenticationToken 
			 = new UsernamePasswordAuthenticationToken(membersDTO.getMemberEmail(), membersDTO.getMemberPass());
			
			authentication = authManager.authenticate(authenticationToken);
			
			log.info("authentication: {}", authentication.getPrincipal());
			
			PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();			
			log.info("로그인 완료됨(인증) : {}, {}, {}", principalDetails.getUsername(),
					principalDetails.getPassword(), principalDetails.getAuthInfo().getAuthRole());
			    
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		return authentication;
	}
	
	
	  //attemptAuthentication() 실행 후 인증이 정상적으로 완료되면 실행된다.
		//여기에서 JWT(Json Web Token) 토큰을 만들어서 request요청한 사용자에게 JWT 토큰을 response 해준다.
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {		
		log.info("successfulAuthentication 실행됨");
		
		 PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		 AuthInfo authInfo = principalDetails.getAuthInfo(); 
		    


		 String accessToken = jwtTokenProvider.createAccessToken(authInfo);
		    String refreshToken = jwtTokenProvider.createRefreshToken(authInfo.getMemberEmail());
		
		log.info("accessToken:{}", accessToken);
		log.info("refreshToken: {}", refreshToken);
		
		// IP, UA 추출
		String ip = request.getRemoteAddr();
		String userAgent = request.getHeader("User-Agent");


		// 저장
		authService.saveRefreshToken(
		    principalDetails.getUsername(),
		    refreshToken,
		    ip,
		    userAgent
		);
		
		//response 응답헤더에 jwtToken 추가		
		response.addHeader("Authorization", "Bearer " + accessToken);
		response.addHeader("Authorization-refresh", refreshToken);
		
		//Access-Control-Expose-Headers는 브라우저에서 JavaScript가 응답 헤더를 읽을 수 있게 허용해주는 CORS 관련 헤더이다. 
		//기본적으로 브라우저는 보안상의 이유로 일부 표준 헤더만 노출하고, 나머지는 차단한다.
		response.setHeader("Access-Control-Expose-Headers", "Authorization, Authorization-refresh");
		
		final Map<String, Object> body = new HashMap<>();
		body.put("memberName", principalDetails.getAuthInfo().getMemberName());
		body.put("memberEmail", principalDetails.getAuthInfo().getMemberEmail());
		body.put("authRole", principalDetails.getAuthInfo().getAuthRole());
		
		// body.put("accessToken", accessToken);
		// body.put("refreshToken", refreshToken);
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);		
		
	}
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		log.info("unsuccessfulAuthentication 실행됨");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("code", HttpStatus.UNAUTHORIZED.value());
        body.put("error", failed.getMessage());


        new ObjectMapper().writeValue(response.getOutputStream(), body);
	}


}






