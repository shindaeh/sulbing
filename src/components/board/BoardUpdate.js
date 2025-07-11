import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../token/interceptors";
import { Alert } from "bootstrap";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { currentPage, num } = useParams();
  const [inputs, setInputs] = useState({
    subject: "",
    content: "",
    filename: null,
  });

  const { subject, content, filename } = inputs;

  const [boardDetail, setBoardDetail] = useState({});

  const getBoardDetail = async () => {
    await instance
      .get(`/board/updateView/${num}`)
      .then((response) => {
        setBoardDetail(response.data);
      })
      .catch((error) => {
        console.log("view page 오류", error.message);
      });
  };

  const handleValueChange = (e) => {
    const contentLength = 200;
    setInputs((prev) => {
      if (e.target.value.length > contentLength)
        alert(`최대 ${contentLength}자까지 입력가능합니다.`);
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("num", num);
    if (filename != null) formData.append("filename", filename);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await instance
      .put(`/board/update`, formData, config)
      .then((response) => {
        navigate(`/board/list/${currentPage}`);
      })
      .catch((error) => console.log("update 오류 :", error.message));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, ...boardDetail };
    });
  };

  //뒤로
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
    // window.history.go(-1);
  };

  useEffect(() => {
    getBoardDetail();
    setInputs((prev) => {
      return { ...prev, ...boardDetail };
    });
  }, [boardDetail.regDate]);
  return (
    <form action="">
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">글쓴이</th>
            <td>{boardDetail.memberEmail}</td>
          </tr>
          <tr>
            <th width="20%">등록일</th>
            <td>{boardDetail.reg_date}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan="3">
              <input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={handleValueChange}
              />
            </td>
          </tr>

          <tr>
            <th>내용</th>
            <td colSpan="3" style={{ whiteSpace: "pre-line" }}>
              <textarea
                name="content"
                id="content"
                cols="40"
                rows="13"
                value={content}
                onChange={handleValueChange}
              ></textarea>
              <div
                style={{
                  top: "100%",
                  right: "0px",
                  marginTop: "4px",
                  marginBottom: "4px",
                  marginLeft: "300px",
                }}
              >
                {content.length}/200
              </div>
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td colSpan="3">
              <input
                type="file"
                name="filename"
                id="filepath"
                onChange={handleFileChange}
              />
              <span>
                {boardDetail.upload &&
                  boardDetail.upload.substring(
                    boardDetail.upload.indexOf("_") + 1
                  )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={handleUpdate}
        style={{
          top: "100%",
          right: "0px",
          marginTop: "4px",
          marginBottom: "4px",
          marginLeft: "350px",
        }}
      >
        수정
      </button>
      <button
        className="btn btn-primary"
        onClick={handleReset}
        style={{
          top: "100%",
          right: "0px",
          marginTop: "4px",
          marginBottom: "4px",
          marginLeft: "5px",
        }}
      >
        취소
      </button>
      <button
        className="btn btn-primary"
        onClick={handleBack}
        style={{
          top: "100%",
          right: "0px",
          marginTop: "4px",
          marginBottom: "4px",
          marginLeft: "5px",
        }}
      >
        뒤로
      </button>
    </form>
  );
};

export default BoardUpdate;
