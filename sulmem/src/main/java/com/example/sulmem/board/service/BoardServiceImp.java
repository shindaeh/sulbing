package com.example.sulmem.board.service;

import java.io.File;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sulmem.board.dto.BoardDTO;
import com.example.sulmem.board.dto.PageDTO;
import com.example.sulmem.board.entity.BoardEntity;
import com.example.sulmem.board.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImp implements BoardService {
	@Autowired
	private BoardRepository boardRepository;

	public BoardServiceImp() {

	}

	@Transactional
	@Override
	public long countProcess() {
		long cnt = boardRepository.count();
		return cnt;
	}

	@Transactional
	@Override
	public List<BoardDTO> listProcess(PageDTO pv) {
		List<BoardEntity> listBoardEntity = boardRepository.findPagedBoardsByRownum(pv);
		// Stream<BoardEntity> => Stream<BoardDTO> => List<BoardDTO>
		List<BoardDTO> listBoardDTO = listBoardEntity.stream().map(BoardDTO::toDTO).collect(Collectors.toList());

		return listBoardDTO;
	}

	@Transactional
	@Override
	public void insertProcess(BoardDTO dto) {
		long newId = boardRepository.getNextVal(); // 별도 시퀀스 조회 필요
		dto.setNum(newId);

		// 답변이 아니면 ref와 num을 동일하게 설정
		if (dto.getRef() == null || dto.getRef() == 0) {
			dto.setRef((int) newId);
			dto.setReStep(0);
			dto.setReLevel(0);
		} else {
			int ref = dto.getRef();
			int reStep = dto.getReStep();
			boardRepository.increaseReStep(ref, reStep);
			dto.setReStep(dto.getReStep() + 1);
			dto.setReLevel(dto.getReLevel() + 1);
		}

		dto.setRegDate(new Date(System.currentTimeMillis()));
		dto.setReadCount(0);
		BoardEntity boardEntity = dto.toEntity();
		boardRepository.save(boardEntity);
	}

	@Transactional
	@Override
	public BoardDTO contentProcess(long num) {
		boardRepository.increaseReadCount(num);
		BoardEntity boardEntity = boardRepository.findWithMemberNameByNum(num);
		return BoardDTO.toDTO(boardEntity);
	}

	@Transactional
	@Override
	public void updateProcess(BoardDTO dto, String tempDir) {
		String filename = dto.getUpload();
		// 수정할 첨부파일이 있으면
		if (filename != null) {
			String uploadFilename = boardRepository.getUploadFilename(dto.getNum());
			// 기존에 저장된 첨부파일 있으면
			if (uploadFilename != null) {
				File file = new File(tempDir, uploadFilename);
				file.delete();
			}
		}
		
		BoardEntity boardEntity = dto.toEntity();
		boardRepository.updateBoard(boardEntity);		
	}

	@Transactional
	@Override
	public void deleteProcess(long num, String tempDir) {
		String  uploadFilename = boardRepository.getUploadFilename(num);
		
		//파일 첨부가 있으면
		if(uploadFilename != null) {
			File file = new File(tempDir, uploadFilename);
			file.delete();
		}
		boardRepository.deleteById(num);
	}
}





