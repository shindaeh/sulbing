package com.example.sulmem.config.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.sulmem.members.dto.AuthInfo;
import com.example.sulmem.members.entity.MembersEntity;
import com.example.sulmem.members.repository.MembersRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PrincipalDetailesService implements UserDetailsService {

	@Autowired
	private MembersRepository membersRepository;

	// 1. AuthenticationProvider에서 loadUserByUsername(String memberEmail)을 호출한다.
	// 2. loadUserByUsername(String memberEmail)에서는 DB에서 memberEmail에 해당하는 데이터를 검색해서
	// UserDetails에 담아서 리턴해준다.
	// 3. AuthenticationProvider에서 UserDetailes받아서 Authentication에 저장을 함으로써 결국
	// Security Session에 저장을 한다.

	@Override
	public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {
		log.info("PrincipalDetailesService => loadUserByUsername() => memberEmail:{}", memberEmail);
		
		Optional<MembersEntity> optMembersEntity = membersRepository.findById(memberEmail);
		
		if(optMembersEntity.isEmpty()) {
			throw new UsernameNotFoundException(memberEmail + "사용자명이 존재하지 않습니다.");
		}
		
		MembersEntity membersEntity = optMembersEntity.get();
		log.info("memberEmail:{} memberPass:{} memberName:{} authRole:{}",  
				membersEntity.getMemberEmail(), membersEntity.getMemberPass(), 
				membersEntity.getMemberName(), membersEntity.getAuthRole());
		
		AuthInfo authInfo = AuthInfo.builder().memberEmail(membersEntity.getMemberEmail())
				.memberPass(membersEntity.getMemberPass())
				.memberName(membersEntity.getMemberName())
				.authRole(membersEntity.getAuthRole()).build();
		return new PrincipalDetails(authInfo);
	}

}
