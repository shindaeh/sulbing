package com.example.sulmem.board.dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Setter
@Getter
public class PageDTO {
	private Long currentPage; // 현재페이지
	private Long totalCount; // 총 레코드수
	private Long blockCount = 5L; // 한 페이지에 보여줄 레코드 수
	private Long blockPage = 3L; // 한 블록에 보여줄 페이지 수
	private Long totalPage; // 총 페이지수
	private Long startRow; // 시작 레코드 번호
	private Long endRow; // 끝 레코드 번호
	private Long startPage; // 한 블록의 시작 페이지 번호
	private Long endPage; // 한 블록의 끝 페이지 번호
	private Long number;

	private String searchKey;
	private String searchWord;

	public PageDTO() {

	}

	public PageDTO(long currentPage, long totalCount) {
		this.currentPage = currentPage;
		this.totalCount = totalCount;
		
		// 총 페이지수
		totalPage = totalCount / blockCount + (totalCount % blockCount == 0 ? 0 : 1);
		if(totalPage<currentPage)
		  this.currentPage = totalPage;

		// 시작레코드
		startRow = (this.currentPage - 1) * blockCount +1;

		// 끝레코드
		endRow = startRow + blockCount - 1;		
	

		// 시작 페이지
		startPage = (long) ((this.currentPage - 1) / blockPage) * blockPage + 1;

		// 끝 페이지
		endPage = startPage + blockPage - 1;
		if (totalPage < endPage)
			endPage = totalPage;

		// 리스트에서에 출력번호
		number = totalCount - (this.currentPage - 1) * blockCount;
	}

	public PageDTO(long currentPage, long totalCount, String searchKey, String searchWord) {
		this(currentPage, totalCount);
		this.searchKey = searchKey;
		this.searchWord = searchWord;
	}

	
}// end class













