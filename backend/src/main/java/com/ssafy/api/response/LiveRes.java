package com.ssafy.api.response;

import com.ssafy.db.entity.Live;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("LiveResponse")
public class LiveRes {
    @ApiModelProperty(name = "Live title")
    private String title;
    @ApiModelProperty(name = "Live description")
    private String description;
    @ApiModelProperty(name = "Live url")
    private String url;
    @ApiModelProperty(name = "Live isLive")
    private boolean isLive;
    @ApiModelProperty(name = "Live thumbnailUrl")
    private String thumbnailUrl;
    @ApiModelProperty(name = "Live location")
    private String location;


    public static LiveRes of(Live live)  {
        LiveRes res = new LiveRes();
        res.setTitle(live.getTitle());
        res.setDescription(live.getDescription());
        res.setUrl(live.getUrl());
        res.setLive(live.isLive());
        res.setThumbnailUrl(live.getThumbnailUrl());
        res.setLocation(live.getLocation());
        return res;
    }

    public static List<LiveRes> of(List<Live> liveList)  {
        List<LiveRes> resList = new ArrayList<>();
        for (Live live: liveList) {
            LiveRes res = new LiveRes();
            res.setTitle(live.getTitle());
            res.setDescription(live.getDescription());
            res.setUrl(live.getUrl());
            res.setLive(live.isLive());
            res.setThumbnailUrl(live.getThumbnailUrl());
            res.setLocation(live.getLocation());
            resList.add(res);
        }
        return resList;
    }
}
