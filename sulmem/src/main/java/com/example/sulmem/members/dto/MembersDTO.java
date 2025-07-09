package com.example.sulmem.members.dto;

import com.example.sulmem.members.entity.MembersEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class MembersDTO {
	private String memberEmail; // 이메일
	private String memberPass; // 비밀번호
	private String memberName; // 이름
	private String memberPhone; // 전화번호
	private Role authRole; // 회원구분

	// DTO -> Entity
	public MembersEntity toEntity() {
		return MembersEntity.builder().memberEmail(memberEmail).memberPass(memberPass).memberName(memberName)
				.memberPhone(memberPhone).authRole(authRole).build();
	}

	// Entity -> DTO
	public static MembersDTO toDTO(MembersEntity membersEntity) {
		return MembersDTO.builder().memberEmail(membersEntity.getMemberEmail())
				.memberPass(membersEntity.getMemberPass()).memberName(membersEntity.getMemberName())
				.memberPhone(membersEntity.getMemberPhone()).authRole(membersEntity.getAuthRole()).build();
	}
}
