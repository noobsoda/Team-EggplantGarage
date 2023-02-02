package com.ssafy.db.entity;

import lombok.*;
import org.checkerframework.common.aliasing.qual.Unique;

import javax.persistence.*;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor


public class MyCategory {

    @Id
    @GeneratedValue
    private Long id;

    @Unique
    private Long categoryId;

    private String name;

    private String sort;
}
