package com.ssafy.api.response;

import lombok.*;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveProductInfo {
    private Long id;
    private Long liveId;
    private Long sellerId;
    private String name;
    private LocalDateTime soldAt;
    private int soldPrice;
    private LocalDateTime creatAt;
    private boolean isPaid;
    private int initialPrice;
    private int leftTopX;
    private int leftTopY;
    private int rightBottomX;
    private int rightBottomY;
    private String imageUrl;
    private Long buyerId;
    private boolean isApproval;

}
