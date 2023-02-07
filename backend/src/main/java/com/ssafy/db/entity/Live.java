package com.ssafy.db.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
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
    private String url;
    private boolean isLive;
    private String thumbnailUrl;
    private Double latitude;
    private Double longitude;
    private String sessionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User user;

    @OneToMany(mappedBy = "live")
    private List<LiveCategory> liveCategoryList;

    @OneToMany(mappedBy = "live")
    private List<UserLive> userLiveList;

}
