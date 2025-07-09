package com.example.sulmem.members.entity;
import com.example.sulmem.members.dto.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Entity
@Table(name = "members")
public class MembersEntity {
	@Id
	private String memberEmail; // 이메일
	private String memberPass; // 비밀번호
	private String memberName; // 이름
	private String memberPhone; // 전화번호
	
	@Enumerated(EnumType.STRING)
	private Role  authRole; //회원구분
}
