package com.ssafy.api.response;

import com.ssafy.db.entity.Category;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LiveDetailGetRes {
    private Long id;
    private List<Category> categories;
    private Long seller_id;
    private String seller_nickname;
    private LocalDateTime createAt;
    private String thumbnailUrl;
    private String title;
    private String description;
    private boolean isLive;
    private List<UserEntryRes> userEntryResList;


}
