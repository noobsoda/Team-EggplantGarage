package com.ssafy.api.response;

import com.ssafy.db.entity.Review;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewResponse")
public class ReviewRes {
    @ApiModelProperty(name = "Review Content")
    String content;
    @ApiModelProperty(name = "Review Score")
    double score;

    public static ReviewRes of(Review review)  {
        ReviewRes res = new ReviewRes();
        res.setContent(review.getContent());
        res.setScore(review.getScore());
        return res;
    }
}
