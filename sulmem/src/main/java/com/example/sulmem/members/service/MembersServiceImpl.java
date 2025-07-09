package com.example.sulmem.members.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.sulmem.members.dto.AuthInfo;
import com.example.sulmem.members.dto.ChangePwdCommand;
import com.example.sulmem.members.dto.MembersDTO;
import com.example.sulmem.members.entity.MembersEntity;
import com.example.sulmem.members.repository.MemberRefreshTokenRepository;
import com.example.sulmem.members.repository.MembersRepository;
import com.sun.source.tree.MemberReferenceTree;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service
public class MembersServiceImpl implements MembersService {
	@Autowired
	private MembersRepository membersRepository;
	

	@Autowired
	private MemberRefreshTokenRepository refreshTokenRepository;

	public MembersServiceImpl() {
	}

	@Override
	public AuthInfo addMemberProcess(MembersDTO dto) {
		membersRepository.save(dto.toEntity());
		return new AuthInfo(dto.getMemberEmail(), dto.getMemberPass(), dto.getMemberName(), dto.getAuthRole());
	}

	@Override
	public AuthInfo loginProcess(MembersDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	public MembersDTO getByMemberProcess(String memberEmail) {
		Optional<MembersEntity> optMembersEntity = membersRepository.findById(memberEmail);
		log.info("findById=>{}", membersRepository.findById(memberEmail));
		log.info("optMembersEntity=>{}", optMembersEntity);
		return MembersDTO.toDTO(optMembersEntity.get());
	}

	@Override
	public AuthInfo updateMemberProcess(MembersDTO dto) {
		membersRepository.save(dto.toEntity());
		return new AuthInfo(dto.getMemberEmail(), dto.getMemberName(), dto.getMemberPass(), dto.getAuthRole());
	}

	@Override
	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd) {
		// TODO Auto-generated method stub
	}

	@Override
	public void deleteMemberProcess(String memberEmail) {
		//1. 관련 리프레시 토큰 삭제
		refreshTokenRepository.deleteByMemberEmail(memberEmail);
		
		// 2. 사용자 삭제
		membersRepository.deleteById(memberEmail);
	}

	@Override
	public Optional<MembersEntity> findByEmail(String memberEmail) {
		return membersRepository.findById(memberEmail);
	}

	
}
