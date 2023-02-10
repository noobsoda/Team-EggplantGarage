package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "live_id")
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
