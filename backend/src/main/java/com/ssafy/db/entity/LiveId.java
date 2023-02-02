package com.ssafy.db.entity;

import lombok.*;

import java.io.Serializable;

// 복합키 IdClass용으로 만든 클래스 아직 미구현
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class LiveId implements Serializable {
    @EqualsAndHashCode.Include

    private Long user;
    @EqualsAndHashCode.Include

    private Long id;
}
