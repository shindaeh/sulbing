import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ board, currentPage }) => {
  return (
    <tr>
      <td>{board.num}</td>
      <td>
        {board.reLevel > 0 && (
          <>
            <img
              alt="level"
              src="/images/level.gif"
              width={board.reLevel * 20}
              height="15"
            />
            <img alt="re" src="/images/re.gif" />
          </>
        )}
        <Link to={`/board/view/${currentPage}/${board.num}`}>
          {board.subject}
        </Link>
        {board.readCount >= 30 ? <img alt="hot" src="/images/hot.gif" /> : null}
      </td>
      <td>{board.memberEmail}</td>
      <td>{board.readCount}</td>
    </tr>
  );
};

export default TableRow;
