package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("UserEntryRes")
public class UserEntryRes {
    private Long id;
    private String nickname;

}
