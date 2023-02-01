package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Product extends BaseEntity {
    private String name;
    private LocalDateTime soldAt;
    private int soldPrice;
    private boolean isPaid;
    private int initialPrice;
    private int leftTopX;
    private int leftTopY;
    private int rightBottomX;
    private int rightBottomY;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "live_id", referencedColumnName = "id"),
            @JoinColumn(name = "seller_id", referencedColumnName = "seller_id")
    })
    private Live live;

    @OneToMany(mappedBy = "product")
    private List<BundledItemsRelation> bundledItemsRelationList;

}
