import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import TableRow from "./TableRow";
import PageNavigation from "./PageNavigation";
import instance from "../../token/interceptors";

// http://localhost:3000/board/list/1

const BoardList = () => {
  const {currentPage} = useParams();
  const [boardList, setBoardList] = useState([]);
  const [pv, setPv] = useState({});



  const getBoardList = async (currentPage) => {
    console.log("board list =>", currentPage);
    await instance
    .get(`/board/list/${currentPage}`)
    .then((response) => {
      console.log(response.data);
      setBoardList(response.data.boardList);
      setPv(response.data.pv);

    })
    .catch((error)=> console.log("board list 오류:", error.message));
  };



  useEffect(()=>{
      getBoardList(currentPage);
  }, [currentPage]);

 
  return (
    <div>
 <Link className="btn btn-danger" to="/board/write">
        글쓰기
      </Link>
      <h3 className="text-center">게시판 목록</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>


        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>


        <tbody>
          {boardList &&
            boardList.map((board) => {
              return <TableRow 
              board={board}
              currentPage={currentPage}
               key={board.num} />;
            })}
        </tbody>
      </table>


      {pv && <PageNavigation pv={pv} getBoardList={getBoardList} />}

    </div>
  );
};

export default BoardList;
