package com.example.sulmem.members.service;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.sulmem.members.entity.MemberRefreshTokenEntity;
import com.example.sulmem.members.repository.MemberRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
@Transactional
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
   private final MemberRefreshTokenRepository tokenRepository;
   public void saveRefreshToken(String email, String refreshToken, String ip, String userAgent) {
       tokenRepository.findByMemberEmail(email).ifPresentOrElse(
           existing -> {
               existing.setRefreshToken(refreshToken);
               existing.setIpAddress(ip);
               existing.setUserAgent(userAgent);
               existing.setCreatedAt(LocalDateTime.now());
               tokenRepository.save(existing);
           },
           () -> {
               tokenRepository.save(MemberRefreshTokenEntity.builder()
                       .memberEmail(email)
                       .refreshToken(refreshToken)
                       .ipAddress(ip)
                       .userAgent(userAgent)
                       .createdAt(LocalDateTime.now())
                       .build());
           }
       );
   }
   public boolean validateRefreshToken(String email, String token) {
       return tokenRepository.findByMemberEmail(email)
               .map(stored -> stored.getRefreshToken().equals(token))
               .orElse(false);
   }
   public void deleteRefreshToken(String email) {    	   
       tokenRepository.deleteByMemberEmail(email);
   }
}




