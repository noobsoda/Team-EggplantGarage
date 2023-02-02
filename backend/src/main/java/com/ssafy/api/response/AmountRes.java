package com.ssafy.api.response;

import lombok.Data;

@Data
public class AmountRes {
    private Integer total, tax_free, vat, point, discount;
}
