import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import { setBundleRefuse } from "../../../util/api/productApi";

export default function SuggestionList({ isSeller, suggestList, getSuggest }) {
  useEffect(() => {
    getSuggest();
  }, []);

  function bundleCancle(bundleId) {
    console.log("번들 취소");
    setBundleRefuse(
      bundleId,
      () => {
        getSuggest();
        console.log("취소 완료");
      },
      () => {
        console.warn("bundle reject fail");
      }
    );
  }
  function bundleAccept(bundleId) {
    console.log("해당 번들 수락");
  }
  return (
    <>
      {suggestList.map((items, i) => {
        console.log(items);
        return (
          <BundleBox
            key={i}
            isSeller={isSeller}
            reject={() => bundleCancle(items[0].bundleId)}
            accept={() => bundleAccept(items[0].bundleId)}
          >
            {items
              .map((ele) => {
                return {
                  key: ele.id,
                  id: ele.id,
                  bundleId: ele.bundleId,
                  productName: ele.name,
                  imageUrl: ele.imageUrl,
                  leftTopX: ele.leftTopX,
                  leftTopY: ele.leftTopY,
                  rightBottomX: ele.rightBottomX,
                  rightBottomY: ele.rightBottomY,
                  paid: ele.paid,
                  initialPrice: ele.initialPrice,
                  soldPrice: ele.soldPrice,
                  nickName: ele.nickName,
                  isSaleList: true,
                };
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item.productName}
                    item={item}
                    isBundle={true}
                    isSeller={isSeller}
                  />
                );
              })}
          </BundleBox>
        );
      })}
    </>
  );
}
