import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import { setBundleRefuse } from "../../../util/api/productApi";

export default function SuggestionList({ isSeller, suggestList, getSuggest }) {
  useEffect(() => {
    getSuggest();
  }, []);

  function bundleCancle(bundleId) {
    setBundleRefuse(
      bundleId,
      () => {
        getSuggest();
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
                    isSeller={isSeller}
                    isSaleList={item.isSaleList}
                  />
                );
              })}
          </BundleBox>
        );
      })}
    </>
  );
}
