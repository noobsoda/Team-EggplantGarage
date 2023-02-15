package com.ssafy.db.repository;

import com.ssafy.db.entity.ChatRoom;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("SELECT cr FROM ChatRoom cr WHERE (cr.firstUser.id = :receiverId AND cr.secondUser.id = :senderId) OR (cr.firstUser.id = :senderId AND cr.secondUser.id = :receiverId)")
    Optional<ChatRoom> findOneByUsersId(@Param("receiverId") long receiverId, @Param("senderId") long senderId);

    @Query("SELECT cr FROM ChatRoom cr WHERE :userId IN (cr.firstUser.id, cr.secondUser.id)")
    List<ChatRoom> findAllByUserId(long userId);

    Optional<ChatRoom> findByid(long id);
}
