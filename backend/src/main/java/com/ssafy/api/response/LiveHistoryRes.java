package com.ssafy.api.response;

import com.ssafy.db.entity.Live;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ApiModel("LiveHistoryResponse")
public class LiveHistoryRes {
    @ApiModelProperty(name = "Live id")
    private long liveId;
    @ApiModelProperty(name = "Live title")
    private String title;
    @ApiModelProperty(name = "Live thumbnailUrl")
    private String thumbnailUrl;
    @ApiModelProperty(name = "Live createdAt")
    private LocalDateTime createdAt;

    public static LiveHistoryRes of(Live live)  {
        LiveHistoryRes res = LiveHistoryRes.builder()
                .liveId(live.getId())
                .title(live.getTitle())
                .thumbnailUrl(live.getThumbnailUrl())
                .createdAt(live.getCreatedAt())
                .build();
        return res;
    }
}
