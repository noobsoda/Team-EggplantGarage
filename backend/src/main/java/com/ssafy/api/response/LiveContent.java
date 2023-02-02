package com.ssafy.api.response;

import com.ssafy.db.entity.Category;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveContent {
    private Long id;
    private List<Category> categories;
    private int joinUsersNum;
    private String owner;
    private LocalDateTime createAt;
    private String thumbnailUrl;
    private String title;
    private String description;
    private boolean isActive;
}
