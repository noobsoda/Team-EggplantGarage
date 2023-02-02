package com.ssafy.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class UserLive{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Live live;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @CreatedDate
    private LocalDateTime entryTime;

    public static UserLive of(Live live, User user) {
        UserLive userLive = new UserLive();
        userLive.setLive(live);
        userLive.setUser(user);
        return userLive;
    }

}
