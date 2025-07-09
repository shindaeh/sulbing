##############################################
게시판 만들기
##############################################
//Java에서 카멜표기법(memberEmail) => oracle에서 스네이크 표기법(member_email)

1. 테이블생성 
CREATE TABLE   board(
    num number CONSTRAINT board_num PRIMARY KEY,
    subject varchar2(50),
    reg_date date,
    readcount number default 0, 
    ref number, 
    re_step number, 
    re_level number, 
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





#############################################
      그룹      출력순서    출력들여쓰기
num    ref    re_step   re_level
 1      1         0       0               => 제목글1
 2      2         0       0               => 제목글2
 3      1         4       1               => 제목1  => 답변 
 4      1         1       1               => 제목1  => 답변 
 5      1         2       2               => 제목1  => 답변4  => 답변
 6      6         0       0               => 제목글3
 7      1         3       3               => 제목1  => 답변4  => 답변5 => 답변

 ref DESC,  re_step ASC

 제목6
 제목2
 제목1
    답변4
       답변5
          답변7
    답변3

*/




ALTER TABLE board
RENAME COLUMN readcount TO  read_count;

SELECT b.* FROM 
    (SELECT rownum AS rm, a.*  FROM
       (SELECT * FROM board ORDER BY ref DESC ,  re_step ASC)a)b
WHERE  b.rm >= 1 AND b.rm <= 3;       


UPDATE  board   b SET  b.re_step =  b.re_step + 1  WHERE  b.ref  =  1 AND  b.re_step  > 3;

SELECT * FROM board;

DELETE FROM board WHERE num=10;
COMMIT;
SELECT * FROM board;

SELECT   department_id , 
               CASE WHEN  department_id=10 THEN  'aaaa'
                            WHEN department_id=20  THEN 'bbbb'
                  ELSE 'cccc'
                  END AS other                
FROM departments;





