package com.ssafy.api.controller;

import com.ssafy.api.response.LiveRes;
import com.ssafy.api.response.ProductRes;
import com.ssafy.api.service.LiveService;
import com.ssafy.api.service.ProductService;
import com.ssafy.db.entity.Live;
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

    @Autowired
    LiveService liveService;

    @GetMapping("/buyer/{buyerId}")
    @ApiOperation(value = "구매 내역 조회", notes = "구매 내역 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "내역 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ProductRes>> getProductHistoryByBuyerId(@ApiParam(value = "구매자 id", required = true) @PathVariable("buyerId") long buyerId) {

        List<Product> productList = productService.getHistoryByBuyerId(buyerId);

        return ResponseEntity.status(200).body(ProductRes.of(productList));
    }

    @GetMapping("/seller/{sellerId}")
    @ApiOperation(value = "판매 내역 조회", notes = "판매 내역 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "내역 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<LiveRes>>  getLiveHistoryBySellerId(@ApiParam(value = "판매자 id", required = true) @PathVariable("sellerId") long sellerId) {

        List<Live> liveList = liveService.getHistoryBySellerId(sellerId);

        return ResponseEntity.status(200).body(LiveRes.of(liveList));
    }
    @GetMapping("/live/{liveId}")
    @ApiOperation(value = "판매 내역 상세 조회", notes = "판매 내역 상세 정보를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "내역 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ProductRes>>  getLiveHistoryByLiveId(@ApiParam(value = "라이브 id", required = true) @PathVariable("liveId") long liveId) {

        List<Product> productList = productService.getHistoryByLiveId(liveId);

        return ResponseEntity.status(200).body(ProductRes.of(productList));
    }

}
