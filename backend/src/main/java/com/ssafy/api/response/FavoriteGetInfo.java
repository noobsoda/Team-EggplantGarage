package com.ssafy.api.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteGetInfo {
    private Long userId;
    private Long liveId;
}
