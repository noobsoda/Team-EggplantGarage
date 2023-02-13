import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import {
  setBundleRefuse,
  setBundleCancel,
  setBundleApproval,
} from "../../../util/api/productApi";

export default function SuggestionList({ isSeller, suggestList, getSuggest }) {
  useEffect(() => {
    getSuggest();
  }, []);

  function bundleRefuse(bundleId) {
    setBundleRefuse(
      bundleId,
      () => {
        getSuggest();
      },
      () => {
        console.warn("bundle refuce fail");
      }
    );
  }

  function bundleCancel(bundleId) {
    setBundleCancel(
      bundleId,
      () => {
        getSuggest();
      },
      () => {
        console.warn("bundle cancle fail");
      }
    );
  }
  function bundleAccept(bundleId) {
    setBundleApproval(
      bundleId,
      () => {
        getSuggest();
      },
      () => {
        console.warn("bundle accept fail");
      }
    );
  }
  return (
    <>
      {suggestList.map((items, i) => {
        return (
          <BundleBox
            key={i}
            isSeller={isSeller}
            bundleUser={items[0].nickname}
            cancel={() => bundleCancel(items[0].bundleId)}
            refuse={() => bundleRefuse(items[0].bundleId)}
            accept={() => bundleAccept(items[0].bundleId)}
            bundlePrice={items[0].totalPrice}
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
