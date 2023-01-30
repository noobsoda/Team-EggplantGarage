package com.ssafy.api.controller;

import com.ssafy.api.response.ProductRes;
import com.ssafy.api.service.ProductService;
import com.ssafy.db.entity.Product;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "내역 API", tags = {"History."})
@RestController
@RequestMapping("/api/v1/history")
public class HistoryController {
    private final Logger logger;

    @Autowired
    public HistoryController(Logger logger) {
        this.logger = logger;
    }

    @Autowired
    ProductService productService;

    @GetMapping("/history/buyer/{buyerId}")
    @ApiOperation(value = "구매 내역 조회", notes = "구매 내역 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "리뷰 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ProductRes>> getHistoryByBuyerId(@ApiParam(value = "구매자 id", required = true) @PathVariable("buyerId") long buyerId) {

        List<Product> productList = productService.getHistoryByBuyerId(buyerId);

        return ResponseEntity.status(200).body(ProductRes.of(productList));
    }
}
