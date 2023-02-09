package com.ssafy.db.repository;

import com.ssafy.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("SELECT cr FROM ChatRoom cr WHERE (cr.firstUser.id = ?1 AND cr.secondUser.id = ?2) OR (cr.firstUser.id = ?2 AND cr.secondUser.id = ?1)")
    Optional<ChatRoom> findOneByUsersId(long receiverId, long senderId);

    @Query("SELECT cr FROM ChatRoom cr WHERE (cr.firstUser.id = ?1 OR cr.secondUser.id = ?1)")
    List<ChatRoom> findByFirstUserIdOrSecondUserId(long userId);
    Optional<ChatRoom> findByid(long id);
}
