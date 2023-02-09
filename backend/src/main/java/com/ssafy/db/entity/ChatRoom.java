package com.ssafy.db.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ChatRoom extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_user_id")
    private User firstUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "second_user_id")
    private User secondUser;
    private String lastSendMessage;
    private LocalDateTime lastSendTime;

    // cascade = CascadeType.ALL : Entity를 C/U/D할 때  JPA persistence provider에 의해서 Addresses도 똑같이 C/U/D
    // orphanRemoval = true : PK(JoinColumn)값이 NULL로 변한 자식 삭제
    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> chatMessageList;
}
