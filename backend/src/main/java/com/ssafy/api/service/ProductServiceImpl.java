package com.ssafy.api.service;

import com.ssafy.api.request.ProductReq;
import com.ssafy.api.request.ProductsRegisterPostReq;
import com.ssafy.common.exception.CustomException;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.Product;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.ssafy.common.error.ErrorCode.*;

@Service("productService")
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final LiveRepository liveRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository, LiveRepository liveRepository) {
        this.userRepository = userRepository;
        this.liveRepository = liveRepository;
        this.productRepository = productRepository;
    }

    @Override
    public boolean postProductById(ProductsRegisterPostReq productList, Map<String, Object> reqMap) {

        //상품을 등록한다.
        String thumbnailUrl = (String) reqMap.get("thumbnailUrl");

        List<ProductReq> productReqList = productList.getProductList();


        for (ProductReq productReq : productReqList) {
            Optional<Live> oLive = liveRepository.findById(productReq.getLiveId());
            
            //해당하는 라이브가 없으면 상품을 넣을수가 없음
            Live live = oLive.orElseThrow(()->new CustomException(LIVE_NOT_FOUND));


            Product product = Product.builder()
                    .live(live)
                    .name(productReq.getName())
                    .initialPrice(productReq.getInitialPrice())
                    .leftTopX(productReq.getLeftTopX())
                    .leftTopY(productReq.getLeftTopY())
                    .rightBottomX(productReq.getRightBottomX())
                    .rightBottomY(productReq.getRightBottomY())
                    .imageUrl(thumbnailUrl)
                    .build();

            productRepository.save(product);


        }




        return true;
    }
}
