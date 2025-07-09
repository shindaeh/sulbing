import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../token/interceptors";

const EditInfo = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState({
    memberEmail: "",
    memberPass: "",
    memberName: "",
    memberPhone: "",
  });

  const { memberEmail, memberPass, memberName, memberPhone } = members;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("Authorization"),
    },
  };

  const handleValueChange = (e) => {
    setMembers({ ...members, [e.target.name]: e.target.value });
  };

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChang = (e) => {
    if (memberPass !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const info = async () => {
    await instance
      .get(`/member/editinfo/${localStorage.memberEmail}`, config)
      .then((response) => {
        setMembers((prev) => {
          return { ...prev, ...response.data, memberPass: "" };
        });
      })
      .catch((error) => {
        console.log("정보 조회 실패:", error);
        alert("회원 정보를 불러오는 데 실패했습니다.");
      });
  };

  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!memberPass) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    await instance
      .put(`/member/update`, members, config)
      .then((response) => {
        localStorage.setItem("memberName", memberName);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("수정 실패:", error);
        alert("회원정보 수정 실패");
      });
  }; // ← 누락되었던 이 괄호 추가됨

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원정보</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="memberEmail"
              placeholder="이메일"
              value={localStorage.memberEmail}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass"
              placeholder="비밀번호"
              value={memberPass}
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass2"
              placeholder="비밀번호 확인"
              onChange={passChang}
            />
            <span>{passwordCheck}</span>
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberName"
              placeholder="이름"
              value={memberName}
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberPhone"
              placeholder="연락처"
              value={memberPhone}
              onChange={handleValueChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            회원정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
