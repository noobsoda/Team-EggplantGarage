import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";

export default function SuggestionList({ isSeller, suggestList, getSuggest }) {
  useEffect(() => {
    getSuggest();
  }, []);

  function bundleCancle() {}
  function bundleAccept() {}
  return (
    <>
      {suggestList.map((items, i) => {
        return (
          <BundleBox key={i} isSeller={isSeller}>
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
