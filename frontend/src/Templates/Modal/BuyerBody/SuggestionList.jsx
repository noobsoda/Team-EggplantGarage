import React, { useEffect } from "react";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import {
  setBundleRefuse,
  setBundleCancel,
  setBundleApproval,
} from "../../../util/api/productApi";

export default function SuggestionList({
  userInfo,
  isSeller,
  suggestList,
  getSuggest,
  sendMessage,
}) {
  useEffect(() => {
    getSuggest();
  }, []);

  function bundleRefuse(bundleId, item) {
    setBundleRefuse(
      bundleId,
      () => {
        sendMessage(`${item.nickname}님의 요청이 거절됐어요.`);
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
        sendMessage(`${userInfo.nickname}님이 요청을 취소했어요`);
        getSuggest();
      },
      () => {
        console.warn("bundle cancle fail");
      }
    );
  }
  function bundleAccept(bundleId, item) {
    setBundleApproval(
      bundleId,
      () => {
        sendMessage(`${item.nickname}님의 묶음을 승락 했어요. 결제해주세요`);
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
            refuse={() => bundleRefuse(items[0].bundleId, items[0])}
            accept={() => bundleAccept(items[0].bundleId, items[0])}
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
