package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Live extends BaseEntity {
    private String title;
    private String description;
    @Column(unique = true)
    private String url;
    private boolean isLive;
    private String thumbnailUrl;
    private String location;

    private String session_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User user;
}
