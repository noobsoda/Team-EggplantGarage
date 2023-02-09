package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Location {
    private Double latitude;
    private Double longitude;

}
