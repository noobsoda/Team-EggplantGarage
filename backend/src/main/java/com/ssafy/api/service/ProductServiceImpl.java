package com.ssafy.api.service;

import com.ssafy.api.request.ProductReq;
import com.ssafy.api.request.ProductsRegisterPostReq;
import com.ssafy.db.entity.Live;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LiveRepository;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.UserRepository;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
            Live live = oLive.orElse(null);
            if(live == null)
                continue;


            Product.builder()
                    .live(live)
                    .buyerId(productReq.getSellerId())
                    .name(productReq.getName())
                    .initialPrice(productReq.getInitialPrice())
                    .leftTopX(productReq.getLeftTopX())
                    .leftTopY(productReq.getLeftTopY())
                    .rightBottomX(productReq.getRightBottomX())
                    .rightBottomY(productReq.getRightBottomY())
                    .imageUrl(thumbnailUrl)
                    .build();



        }




        return false;
    }
}
