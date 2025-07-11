import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../token/interceptors";
import { isVisible } from "@testing-library/user-event/dist/utils";

const BoardWrite = () => {
  const navigate = useNavigate();
  const { currentPage, num, ref, reStep, reLevel } = useParams();
  const [inputs, setInputs] = useState({
    subject: "",
    content: "",
    filename: null,
  });
  const { subject, content, filename } = inputs;

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

  const handleNumChange = (e) => {
    e.preventDefault();
    const maxLength = 200;

    setInputs(e.target.content.length);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("memberEmail", localStorage.getItem("memberEmail"));
    if (filename != null) formData.append("filename", filename);

    //답변글이면
    if (num !== undefined) {
      formData.append("num", num);
      formData.append("ref", ref);
      formData.append("reStep", reStep);
      formData.append("reLevel", reLevel);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await instance
      .post(`/board/write`, formData, config)
      .then((response) => {
        setInputs({ subject: "", content: "", filename: null });
        navigate(`/board/list/${num ? currentPage : 1}`);
      })
      .catch((error) => {
        console.log("글쓰기 오류:", error.message);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>글쓴이</th>
              <td>
                <input
                  type="text"
                  name="memberEmail"
                  readOnly
                  value={localStorage.getItem("memberEmail")}
                />
              </td>
            </tr>
            <tr>
              <th width="20%" align="center">
                제목
              </th>
              <td>
                <input
                  type="text"
                  name="subject"
                  size="40"
                  placeholder={num !== undefined ? "답변" : null}
                  onChange={handleValueChange}
                />
              </td>
            </tr>
            <tr>
              <th width="20%" align="center">
                내용
              </th>
              <td>
                <textarea
                  name="content"
                  cols="40"
                  rows="13"
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
              <th width="20%" align="center">
                첨부파일
              </th>

              <td>
                <input
                  type="file"
                  name="filename"
                  id="filepath"
                  onChange={handleFileChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link
          className="btn btn-primary"
          to={`/board/list/1`}
          style={{
            top: "100%",
            right: "0px",
            marginTop: "4px",
            marginBottom: "4px",
            marginLeft: "320px",
          }}
        >
          리스트
        </Link>
        <input
          type="submit"
          className="btn btn-primary"
          value="등록"
          style={{
            top: "100%",
            right: "0px",
            marginTop: "4px",
            marginBottom: "4px",
            marginLeft: "5px",
          }}
        />
      </form>
    </>
  );
};

export default BoardWrite;
