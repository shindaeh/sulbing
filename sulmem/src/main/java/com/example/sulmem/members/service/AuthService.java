package com.example.sulmem.members.service;
public interface AuthService {
	public void saveRefreshToken(String email, String refreshToken, String ip, String userAgent);
	 public boolean validateRefreshToken(String email, String token);
	 public void deleteRefreshToken(String email);
}




