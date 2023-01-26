package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class BundledItemsRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = null;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bundle_id")
    private Bundle bundle;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    public static BundledItemsRelation of(Bundle bundle, Product product){
        BundledItemsRelation bundledItemsRelation = new BundledItemsRelation();
        bundledItemsRelation.setBundle(bundle);
        bundledItemsRelation.setProduct(product);
        return bundledItemsRelation;
    }
}
