package com.ssafy.db.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
// Serializable: Entity를 조인하는 과정 중 PK를 조인한게 아닌 Unique Key를 사용하기 위해 필요
public class Live extends BaseEntity implements Serializable {
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
    private List<LiveCategory> liveCategoryList;

    @OneToMany(mappedBy = "live")
    private List<UserLive> userLiveList;

}
