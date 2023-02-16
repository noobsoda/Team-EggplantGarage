import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import { kakaopay } from "../../../util/api/productApi";
import { isMobile } from "../../../util";

export default function PayList({ payList, getPayList, sendMessage }) {
  useEffect(() => {
    getPayList();
  }, []);
  function bundlePay(bundleId, item) {
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
        return (
          <BundleBox
            key={i}
            isPay={true}
            bundlePrice={items[0].totalPrice}
            accept={() => bundlePay(items[0].bundleId, items[0])}
          >
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
