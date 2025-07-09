##############################################
게시판 만들기
##############################################
//Java에서 카멜표기법(memberEmail) => oracle에서 스네이크 표기법(member_email)

1. 테이블생성 
CREATE TABLE   board(
    num number CONSTRAINT board_num PRIMARY KEY,
    subject varchar2(50),
    reg_date date default sysdate,
    read_count number default 0, 
    ref number, 
    re_step number default 0 , 
    re_level number default 0, 
    content varchar2(200),
    ip varchar2(20),
    upload varchar2(300),
    member_email varchar2(50),
   CONSTRAINT board_memberEmail FOREIGN KEY(member_email) REFERENCES members(member_email)
);

CREATE SEQUENCE board_num_seq
START WITH 1 
INCREMENT BY 1
NOCACHE
NOCYCLE;

INSERT INTO board 
VALUES(board_num_seq.nextval,'제목1',sysdate,0,board_num_seq.nextval,
0,0,'내용 테스트.......','127.0.0.1','sample.txt', null);

commit;


select b.* 
from (select rownum as rm, a.*
	  from (select *
	 	    from board
            order by ref desc, re_step asc) a)b
where b.rm>=? and b.rm<=?           



-- 컬럼 추가
/*
ALTER TABLE board
ADD memberEmail varchar2(50);
*/

-- 제약조건 
/*
ALTER TABLE board
ADD CONSTRAINT board_memberEmail FOREIGN KEY(memberEmail) REFERENCES members(memberEmail);
*/




--  MYSQL====================================================================================================================
CREATE TABLE board (
    num INT AUTO_INCREMENT,
    subject VARCHAR(50),
    reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    readcount INT DEFAULT 0,
    ref INT,
    re_step INT,
    re_level INT,
    content VARCHAR(200),
    ip VARCHAR(20),
    upload VARCHAR(300),
    memberEmail VARCHAR(50),
    PRIMARY KEY (num),
    CONSTRAINT board_memberEmail FOREIGN KEY(memberEmail) REFERENCES members(memberEmail)
);

INSERT INTO board 
(subject, reg_date, readcount, ref, re_step, re_level, content, ip, upload, memberEmail)
VALUES ('제목1', NOW(), 0, LAST_INSERT_ID(), 0, 0, '내용 테스트.......', '127.0.0.1', 'sample.txt', NULL);






















