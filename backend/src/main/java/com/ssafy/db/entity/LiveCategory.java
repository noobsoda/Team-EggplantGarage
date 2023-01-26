package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class LiveCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = null;

    @ManyToOne(fetch = FetchType.LAZY)
    private Live live;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    public static LiveCategory of(Live live, Category category){
        LiveCategory liveCategory = new LiveCategory();
        liveCategory.setLive(live);
        liveCategory.setCategory(category);
        return liveCategory;
    }


}
