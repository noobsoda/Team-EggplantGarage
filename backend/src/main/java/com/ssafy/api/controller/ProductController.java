package com.ssafy.api.controller;

import com.ssafy.api.request.ProductsRegisterPostReq;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.ProductService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
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
@RequestMapping("/api/v1/products")
public class ProductController {
    private final Logger logger;
    private final UserService userService;
    private final ProductService productService;
    private final FileService fileService;

    public ProductController(Logger logger, UserService userService, ProductService productService, FileService fileService) {
        this.logger = logger;
        this.userService = userService;
        this.productService = productService;
        this.fileService = fileService;

    }

    @PostMapping("")
    @ApiOperation(value = "상품 등록", notes = "현재 라이브에 상품을 등록한다..")
    public ResponseEntity<? extends BaseResponseBody> postProductCreate(@ModelAttribute @ApiParam(value = "상품 정보", required = true) ProductsRegisterPostReq productList,
                                                                        @RequestParam MultipartFile img) {
        if(img.isEmpty()){
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "이미지가 없습니다"));
        }

        String filename = fileService.filename(img);
        Path path = fileService.fileSave(img, filename);
        Map<String, Object> reqMap = new HashMap<>();
        reqMap.put("thumbnailUrl", filename);

        if(productService.postProductById(productList, reqMap)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "상품 등록 성공"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "상품에 해당하는 라이브아이디나 유저아이디가 없습니다"));

        }

    }

}
