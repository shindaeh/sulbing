const PageNavigation = ({ pv, getBoardList }) => {

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <nav aria-label="...">
      <ul className="pagination">
        {/*  이전 */}
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link"
            onClick={() => getBoardList(pv.startPage - pv.blockPage)}
          >
            &laquo;
          </span>
        </li>
        {/*페이지 번호*/}
        {pageNumbers &&
          pageNumbers.map((pnum, idx) => {
            return (
              <li key={pnum}>
                <span
                  onClick={() => getBoardList(pnum)}
                  className={
                    pv.currentPage === pnum
                      ? "page-item active page-link"
                      : "page-link"
                  }
                >
                  {/* <Link to={`/board/list/${pnum}`} className="page-link"> */}
                  {pnum}
                  {/* </Link> */}
                </span>
              </li>
            );
          })}


        {/* 다음 */}
        <li
          className={
            pv.endPage >= pv.totalPage ? "page-item disabled" : "page-item"
          }
        >
          <span
            className="page-link"
            onClick={() => getBoardList(pv.startPage + pv.blockPage)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};


export default PageNavigation;