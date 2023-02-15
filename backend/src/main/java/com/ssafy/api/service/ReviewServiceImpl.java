package com.ssafy.api.service;

import com.ssafy.api.request.ReviewWritePostReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.common.exception.CustomException;
import com.ssafy.db.entity.Product;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ProductRepository;
import com.ssafy.db.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.ssafy.common.error.ErrorCode.*;

@Service("reviewService")
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final Logger logger;

    private final ReviewRepository reviewRepository;

    private final ProductRepository productRepository;

    /**
     * @param reviewWriteInfo 리뷰 내용 Info
     * @return 해당 리뷰를 save 한다.
     */
    @Override
    public boolean writeReview(ReviewWritePostReq reviewWriteInfo) {
        Optional<Product> oProduct = productRepository.findById(reviewWriteInfo.getProductId());
        Product product = oProduct.orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));

        List<Review> reviewList = reviewRepository.findByProduct_Id(product.getId());
        if (!reviewList.isEmpty()) {
            for (Review review : reviewList) {

                //판매자 중복 있으면 못 들어감
                if (reviewWriteInfo.isSeller()) {
                    if (review.isSeller()) {
                        throw new CustomException(ALREADY_SAVED_REVIEW);
                    }
                } else {
                    //구매자 중복 있으면 못 들어감
                    if (!review.isSeller()) {
                        throw new CustomException(ALREADY_SAVED_REVIEW);
                    }
                }

            }
        }


        Review review = Review.builder()
                .product(product)
                .content(reviewWriteInfo.getContent())
                .score(reviewWriteInfo.getScore())
                .isSeller(reviewWriteInfo.isSeller())
                .isVisible(reviewWriteInfo.isVisible())
                .build();
        reviewRepository.save(review);

        return true;
    }

    /**
     * @param sellerId 판매자 아이디
     * @return 판매자 아이디와 연관된 리뷰를 반환한다.
     */
    @Override
    public List<ReviewRes> getSellerReviews(long sellerId) {
        List<Review> reviewList = reviewRepository
                .findByProduct_Live_User_IdAndIsSellerTrueOrderByCreatedAtDesc(sellerId);
        if (reviewList == null || reviewList.isEmpty())
            throw new CustomException(REVIEW_NOT_FOUND);
        return ReviewRes.of(reviewList);
    }

    /**
     * @param buyerId 구매자 아이디
     * @return 구매자 아이디와 연관된 모든 리뷰를 불러온다.
     */
    @Override
    public List<ReviewRes> getBuyerReviews(long buyerId) {
        List<Review> reviewList = reviewRepository.findByProduct_BuyerIdAndIsSellerFalseOrderByCreatedAtDesc(buyerId);
        if (reviewList == null || reviewList.isEmpty())
            throw new CustomException(REVIEW_NOT_FOUND);


        return ReviewRes.of(reviewList);
    }

    /**
     * @param id 리뷰아이디
     * @return 리뷰아이디를 통해 리뷰 RES 를 불러온다.
     */
    @Override
    public ReviewRes getReview(long id) {

        Optional<Review> oReview = reviewRepository.findById(id);
        Review review = oReview.orElseThrow(() -> new CustomException(REVIEW_NOT_FOUND));
        return ReviewRes.of(review);
    }
}
