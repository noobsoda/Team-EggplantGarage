import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import BigBtn from "../../../Atoms/Buttons/BigBtn";
import BigInput from "../../../Atoms/Inputs/BigInput";
import { postBundle } from "../../../util/api/productApi";

const InfoBox = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
`;

export default function SalesList({ userId, liveId, isSeller, productList }) {
  const [check, setCheck] = useState(
    productList.map((ele, i) => {
      return { id: ele.id, check: false };
    })
  );

  const [bundlePrice, setBundlePrice] = useState(0);

  useEffect(() => {
    console.log(check);
  }, [check]);

  const changeHandler = (e, id) => {
    let checked = e.currentTarget.checked;
    let bundlePriceTmp = 0; //가격 계산
    setCheck(
      check.map((ele, i) => {
        //기존 체크한거 계산
        if (ele.check) {
          bundlePriceTmp += productList[i].initialPrice;
        }
        if (ele.id === id) {
          if (checked) {
            //이번에 체크된거
            bundlePriceTmp += productList[i].initialPrice;
          } else {
            //이번에 체크 해제된경우 - 위에서 먼저 계산이 되었기 때문에
            bundlePriceTmp -= productList[i].initialPrice;
          }
          return { id: id, check: checked };
        }
        return ele;
      })
    );
    setBundlePrice(bundlePriceTmp);
  };

  /**
   * 지금까지 선택한 물품 구매 요청
   */
  function bundle() {
    postBundle(
      {
        productIdList: check.map((ele) => ele.id),
        buyerId: userId,
        soldPrice: bundlePrice,
        liveId: liveId,
      },
      () => {
        //번들 요청 성공
        setBundlePrice(0);
        //체크한것 다시 해제
        setCheck(
          check.map((ele, i) => {
            return { id: ele.id, check: false };
          })
        );
      },
      () => {
        console.warn("bundle fail");
      }
    );
  }

  function priceChange(e) {
    setBundlePrice(e.target.value);
  }
  return (
    <>
      {productList
        .map((ele) => {
          return {
            key: ele.id,
            id: ele.id,
            productName: ele.name,
            imageUrl: ele.imageUrl,
            leftTopX: ele.leftTopX,
            leftTopY: ele.leftTopY,
            rightBottomX: ele.rightBottomX,
            rightBottomY: ele.rightBottomY,
            paid: ele.paid,
            initialPrice: ele.initialPrice,
            isSaleList: true,
          };
        })
        .map((item, i) => {
          return (
            <ItemCard
              key={item.key}
              buttonType={"check"}
              isSeller={isSeller}
              item={item}
              check={check[i].checked}
              isSaleList={item.isSaleList}
              setCheck={(e) => {
                changeHandler(e, i);
              }}
            />
          );
        })}
      {isSeller ? (
        <></>
      ) : (
        <InfoBox>
          <BigInput
            placehold={"예상금액"}
            textalign="right"
            value={bundlePrice}
            inputValue={priceChange}
          />
          <BigBtn name={"구매요청"} buttonClick={bundle} />
        </InfoBox>
      )}
    </>
  );
}
