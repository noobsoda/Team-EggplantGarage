package com.ssafy.api.controller;

import com.ssafy.api.request.ProductsRegisterPostReq;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.ProductService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.error.ErrorCode;
import com.ssafy.common.exception.CustomException;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.model.response.CommonResponse;
import com.ssafy.common.model.response.ResponseService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(value = "상품 API", tags = {"Product"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
    private final Logger logger;
    private final ProductService productService;
    private final FileService fileService;
    private final ResponseService responseService;

    @PostMapping("")
    @ApiOperation(value = "상품 등록", notes = "현재 라이브에 상품을 등록한다..")
    public CommonResponse postProductCreate(@ModelAttribute @ApiParam(value = "상품 정보", required = true) ProductsRegisterPostReq productList,
                                            @RequestParam MultipartFile img) {
        if(img.isEmpty()){
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }

        String filename = fileService.filename(img);
        fileService.fileSave(img, filename);
        Map<String, Object> reqMap = new HashMap<>();
        reqMap.put("thumbnailUrl", filename);

        productService.postProductById(productList, reqMap);

        return responseService.getSuccessResponse(200, "상품 등록 성공");



    }

}
