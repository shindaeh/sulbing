package  com.example.sulmem.board.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.sulmem.board.entity.BoardEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//import members.dto.MembersDTO;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Component
public class BoardDTO {
	private Long num;
	private Integer readCount, ref, reStep, reLevel;
	private String  subject, content, ip, memberEmail;
	private Date regDate;
	

	// 클라이언트 MultipartFile 보냄 ->  DB에 저장 String 
	//board테이블의 파일 첨부를 처리해주는 멤버변수
	private String upload;

	//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;  
	
	// DTO -> Entity
	public BoardEntity toEntity() {
		return BoardEntity.builder()
				.num(num)
				.readCount(readCount)
				.ref(ref)
				.reStep(reStep)
				.reLevel(reLevel)
				.subject(subject)
				.content(content)
				.ip(ip)				
				.regDate(regDate)
				.upload(upload)
				.memberEmail(memberEmail)
				.build();
	}
	
	
	// Entity -> DTO
	public static BoardDTO toDTO(BoardEntity boardEntity) {
		return BoardDTO.builder()
				.num(boardEntity.getNum())
				.readCount(boardEntity.getReadCount())
				.ref(boardEntity.getRef())
				.reStep(boardEntity.getReStep())
				.reLevel(boardEntity.getReLevel())
				.subject(boardEntity.getSubject())
				.content(boardEntity.getContent())
				.ip(boardEntity.getIp())				
				.regDate(boardEntity.getRegDate())
				.upload(boardEntity.getUpload())
				.memberEmail(boardEntity.getMemberEmail())
				.build();
	}

}//end class
