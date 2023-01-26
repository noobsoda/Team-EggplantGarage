package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

// 복합키 IdClass용으로 만든 클래스 아직 미구현
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class ProductId implements Serializable {
    @EqualsAndHashCode.Include

    private LiveId live;
    @EqualsAndHashCode.Include

    private Long id;
}
