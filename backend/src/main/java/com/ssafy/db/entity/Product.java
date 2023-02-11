package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.parameters.P;

import javax.annotation.security.DenyAll;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
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
    private Long buyerId;
    private boolean isApproval;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "live_id", referencedColumnName = "id"),
            @JoinColumn(name = "seller_id", referencedColumnName = "seller_id")
    })
    private Live live;

//    @OneToMany(mappedBy = "product")
//    private List<BundledItemsRelation> bundledItemsRelationList;

    public static Product of(Live live) {
        Product product = new Product();
        product.setLive(live);
        return product;
    }

}
