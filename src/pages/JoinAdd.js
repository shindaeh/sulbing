import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../token/interceptors';

const JoinAdd = () => {

    const navigate = useNavigate();
    const[members, setMembers] = useState({
        memberEmail:"",
        memberPass:"",
        memberName:"",
        memberPhone:"",
        authRole:"USER",
    });


    const handleValueChange = (e) => {
         setMembers((prev)=> {
            return {...prev, [e.target.name]: e.target.value};
        });
    };


    const onSubmit = async(e) => {
        e.preventDefault();
        
        await instance
        .post(`/member/signup`, members)
        .then((response) => { console.log(response.data);
            navigate("/");
        })
        .catch((error)=>{
            console.log("signup 오류:", error.message);
        });
    };

    return (
<div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="memberEmail"
              placeholder="이메일"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass"
              placeholder="비밀번호"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberName"
              placeholder="이름"
              onChange={handleValueChange}
            />
          </div>


          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberPhone"
              placeholder="연락처"
              onChange={handleValueChange}
            />
          </div>


          <div className="form-group mb-1">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="authRole"
                value="USER"
                id="userRole"
                onChange={handleValueChange}
              />
              <label className="form-check-label" htmlFor="userRole">
                사용자
              </label>
            </div>


            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="authRole"
                value="ADMIN"
                id="adminRole"
                onChange={handleValueChange}
              />
              <label className="form-check-label" htmlFor="adminRole">
                관리자
              </label>
            </div>
          </div>




          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>





    );
};

export default JoinAdd;