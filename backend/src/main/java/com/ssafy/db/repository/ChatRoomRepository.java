package com.ssafy.db.repository;

import com.ssafy.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("SELECT cr FROM ChatRoom cr WHERE (cr.fromUser.id = ?1 AND cr.toUser.id = ?2) OR (cr.fromUser.id = ?2 AND cr.toUser.id = ?1)")
    Optional<ChatRoom> findOneByUsersId(long toUserId, long fromUserId);
}
