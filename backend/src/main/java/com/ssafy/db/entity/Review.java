package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Review extends BaseEntity {
    private long productId;
    private String content;
    private double score;
    private boolean isSeller;
    private boolean isVisible;
    private LocalDateTime createdAt;
}
