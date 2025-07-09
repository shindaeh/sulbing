import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Router 제거
import "./App.css";
import BaseLayout from "./components/layout/BaseLayout";
import BoardList from "./components/board/BoardList";
import BoardView from "./components/board/BoardView";
import BoardWrite from "./components/board/BoardWrite";
import BoardUpdate from "./components/board/BoardUpdate";
import JoinAdd from "./pages/JoinAdd";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import EditInfo from "./pages/EditInfo";
import MemberRemove from "./pages/MemberRemove";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { AuthProvider } from "./components/layout/AuthProvider";
import Main from './pages/Main';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Main />} />
            <Route path='about' element={<About/>}/>
            <Route path="board/list/:currentPage" element={<BoardList />} />
            <Route path="board/view/:currentPage/:num" element={<BoardView />} />
            <Route
              path="board/write"
              element={
                <ProtectedRoute>
                  <BoardWrite />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/write/:currentPage/:num/:ref/:reStep/:reLevel"
              element={
                <ProtectedRoute>
                  <BoardWrite />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/update/:currentPage/:num"
              element={
                <ProtectedRoute>
                  <BoardUpdate />
                </ProtectedRoute>
              }
            />
            <Route path="joinadd" element={<JoinAdd />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route
              path="editinfo"
              element={
                <ProtectedRoute>
                  <EditInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="memberremove"
              element={
                <ProtectedRoute>
                  <MemberRemove />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
