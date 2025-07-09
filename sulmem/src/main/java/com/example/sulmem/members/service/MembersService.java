package com.example.sulmem.members.service;

import java.util.Optional;

import com.example.sulmem.members.dto.AuthInfo;
import com.example.sulmem.members.dto.ChangePwdCommand;
import com.example.sulmem.members.dto.MembersDTO;
import com.example.sulmem.members.entity.MembersEntity;

public interface MembersService {
	public AuthInfo addMemberProcess(MembersDTO dto);
	public AuthInfo loginProcess(MembersDTO dto);
	public AuthInfo updateMemberProcess(MembersDTO dto);
	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd);
	
	public void deleteMemberProcess(String memberEmail);
	public MembersDTO getByMemberProcess(String memberEmail);
	public Optional<MembersEntity> findByEmail(String memberEmail);
}
