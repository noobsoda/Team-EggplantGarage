package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Live extends BaseEntity {
    private String title;
    private String description;
    @Column(unique = true)
    private String url;
    private boolean isLive;
    private String thumbnailUrl;
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User user;
}
