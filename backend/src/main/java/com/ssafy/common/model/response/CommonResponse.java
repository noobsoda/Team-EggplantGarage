package com.ssafy.common.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonResponse {

    public Boolean isSuccess;

    public int statusCode;

    public String message;
}