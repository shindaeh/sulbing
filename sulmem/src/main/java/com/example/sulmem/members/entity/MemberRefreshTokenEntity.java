package com.example.sulmem.members.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "member_refresh_tokens")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class MemberRefreshTokenEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "refresh_token_seq")
   @SequenceGenerator(name = "refresh_token_seq", sequenceName = "member_refresh_tokens_seq", allocationSize = 1)
   @Column(name = "refresh_num")
   private Long id;
   @Column(name = "member_email", nullable = false)
   private String memberEmail;
   @Lob
   @Column(name = "refresh_token", nullable = false)
   private String refreshToken;
   @Column(name = "user_agent")
   private String userAgent;
   @Column(name = "ip_address")
   private String ipAddress;
   @Column(name = "created_at", updatable = false)
   private LocalDateTime createdAt;
}




