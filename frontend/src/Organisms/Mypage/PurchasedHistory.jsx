import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCard from "../../Molecules/Cards/ItemCard";
import { getPurchasedList } from "../../util/api/productApi";
import { useSelector } from "react-redux";

const StyledPurchasedHistory = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  overflow-y: scroll;
  height: calc(100% - 130px);
`;

export default function PurchasedHistory() {
  const [items, setItems] = useState(undefined);
  const myId = useSelector((state) => state.user.userInfo.id);
  // const myId = 1; //일단 트래쉬값 넣어놓자
  //여기서 userInfo에서 myId 값을 빼와야하는데 롱 id값을 빼옴
  useEffect(() => {
    getPurchasedList(myId, ({ data }) => {
      // console.log(data);
      //우선 뭐들어오는지 보고
      setItems(data);
    });
  }, []);
  return (
    <StyledPurchasedHistory>
      {items &&
        items.map((item) => {
          console.log(item);
          return (
            <ItemCard
              item={item}
              key={item.id}
              buttonType={"purchasedhistory"}
              isReview={item.myReviewId === 0}
              isSeller={false}
            />
          );
        })}
      {/* <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} /> */}
    </StyledPurchasedHistory>
  );
}
