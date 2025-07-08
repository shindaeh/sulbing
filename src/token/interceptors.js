// src/token/interceptors.js
import axios from "axios";


// ✅ 토큰 갱신 요청 함수
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("Authorization-refresh");
        if (!refreshToken) throw new Error("refreshToken 없음");


        const response = await axios.post(
            "/auth/refresh",
            {},
            {
                baseURL: "http://localhost:8090",
                headers: {
                    "Authorization-refresh": refreshToken,
                },
                withCredentials: true,
            }
        );


        return response.data.accessToken;
    } catch (error) {
        console.error("❌ refreshToken 갱신 실패:", error);
        throw error;
    }
};


// ✅ Axios 인스턴스 생성
const instance = axios.create({
    baseURL: "http://localhost:8090",
    withCredentials: true, // 쿠키 및 인증정보 포함
});


// ✅ 요청 인터셉터: accessToken 자동 포함
instance.interceptors.request.use(
        
    (config) => {
         console.log("요청 인터셉터=>", config)
        const token = localStorage.getItem("Authorization");
        if (token) {
            config.headers["Authorization"] = token; // 이미 Bearer 포함되어 있어야 함
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// ✅ 응답 인터셉터: accessToken 만료 시 refreshToken으로 재발급 요청
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        // accessToken 만료로 인한 401 에러인 경우만 처리
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;


            try {
                const newAccessToken = await refreshAccessToken();


                // 새 토큰 저장 및 헤더 반영
                const bearerToken = `Bearer ${newAccessToken}`;
                localStorage.setItem("Authorization", bearerToken);
                originalRequest.headers["Authorization"] = bearerToken;


                // ✅ 기존 요청 재시도
                return instance(originalRequest);
            } catch (refreshError) {
                console.error("❌ 재요청 중 refreshToken 재발급 실패", refreshError);


                // refreshToken도 만료되었거나 에러 발생 → 로그아웃 처리
                localStorage.removeItem("Authorization");
                localStorage.removeItem("Authorization-refresh");
                localStorage.removeItem("memberEmail");
                localStorage.removeItem("memberName");
                localStorage.removeItem("isLogin");


                window.alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
                window.location.replace("/login");
                return Promise.reject(refreshError);
            }
        }


        // 그 외 오류는 그대로 전파
        return Promise.reject(error);
    }
);


export default instance;






