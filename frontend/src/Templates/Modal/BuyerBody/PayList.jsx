import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import { getBuyerSuggestListPayWait } from "../../../util/api/productApi";

export default function PayList({ payList, getPayList }) {
  useEffect(() => {
    getPayList();
  }, []);
  function bundlePay(bundleId) {
    console.log("해당 번들 결제 시작");
  }
  return (
    <>
      {payList.map((items, i) => {
        console.log(items);
        return (
          <BundleBox key={i} accept={() => bundlePay(items[0].bundleId)}>
            {items
              .map((ele) => {
                ele["key"] = ele.id;
                ele["productName"] = ele.name;
                ele["isSaleList"] = true;
                return ele;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item.productName}
                    item={item}
                    isBundle={true}
                    isSaleList={item.isSaleList}
                    isPay={true}
                  />
                );
              })}
          </BundleBox>
        );
      })}
    </>
  );
}
