package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity {

    @Column(unique = true)
    private String email;
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String name;
    @Column(unique = true)
    private String nickname;
    private String phoneNumber;
    private String bankName;
    private String bankAddress;
    @CreatedDate
    private LocalDateTime createdAt;
    private String refreshToken;


}
