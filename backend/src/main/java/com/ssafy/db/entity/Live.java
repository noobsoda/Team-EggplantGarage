package com.ssafy.db.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
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

    @OneToMany(mappedBy = "live")
    private List<LiveCategory> liveCategoryList = new ArrayList<>();

    @OneToMany(mappedBy = "live")
    private List<UserLive> userLiveList = new ArrayList<>();

}
