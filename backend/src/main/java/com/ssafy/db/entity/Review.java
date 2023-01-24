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
    private long product_id;
    private String content;
    private double score;
    private boolean is_seller;
    private boolean is_visible;
    private LocalDateTime created_at;
}
