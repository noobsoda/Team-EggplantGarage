package com.ssafy.db.entity;

import com.ssafy.api.dto.LiveDto;
import com.vladmihalcea.hibernate.type.json.JsonType;
import com.ssafy.db.entity.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Entity
@Table(name = "lives")
@Getter
@Setter
@NoArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
public class Lives {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private Integer categoryId;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private OffsetDateTime createdAt;

    @PrePersist
    private void beforeSaving() {
        createdAt = OffsetDateTime.now();
    }

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "lives", cascade = {CascadeType.ALL})
    private List<Lives> liveshows = new ArrayList <>();


    public void newLive(LiveDto liveDto) {
//        this.id = liveDto.getId();
//        this.title = liveDto.getTitle();
    }

    // Live 최고 시청자 수
    private Integer userCountMax = 0;


}
