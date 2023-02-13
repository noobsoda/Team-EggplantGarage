import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import { kakaopay } from "../../../util/api/productApi";
import { isMobile } from "../../../util";

export default function PayList({ payList, getPayList }) {
  useEffect(() => {
    getPayList();
  }, []);
  function bundlePay(bundleId) {
    kakaopay(
      { bundleId: bundleId, pcOrMobile: isMobile() ? "mobile" : "pc" },
      ({ data }) => {
        window.open(data.split("redirect:")[1]);
      },
      () => {
        console.warn("pay fail");
      }
    );
  }
  return (
    <>
      {payList.map((items, i) => {
        console.log(items);
        return (
          <BundleBox key={i} isPay={true} accept={() => bundlePay(items[0].bundleId)}>
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
