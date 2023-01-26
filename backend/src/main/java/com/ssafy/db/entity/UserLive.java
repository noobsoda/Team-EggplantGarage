package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class UserLive{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = null;
    @ManyToOne(fetch = FetchType.LAZY)
    private Live live;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private LocalDateTime entryTime;

    public static UserLive of(Live live, User user) {
        UserLive userLive = new UserLive();
        userLive.setLive(live);
        userLive.setUser(user);
        return userLive;
    }

}
