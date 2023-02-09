package com.ssafy.common.error;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorResponse {
    private int errorCode;
    private String message;
}
