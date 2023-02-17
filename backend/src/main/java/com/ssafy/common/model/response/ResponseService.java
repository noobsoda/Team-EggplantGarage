package com.ssafy.common.model.response;

import com.ssafy.common.error.ErrorCode;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    //응답 데이터가 없는 경우
    public CommonResponse getSuccessResponse(int StatusCode, String message) {
        CommonResponse response = new CommonResponse();
        response.setIsSuccess(true);
        response.setStatusCode(StatusCode);
        response.setMessage(message);

        return response;
    }


    //예외 응답
    public CommonResponse getExceptionResponse(ErrorCode errorCode) {
        CommonResponse response = new CommonResponse();
        response.setIsSuccess(errorCode.isSuccess());
        response.setStatusCode(errorCode.getStatus());
        response.setMessage(errorCode.getMessage());

        return response;

    }
}
