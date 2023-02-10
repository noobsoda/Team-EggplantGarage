import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";
import Check from "../../Atoms/Inputs/Check";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../../util/api/chatApi";
import { checkUserInfo } from "../../store/user";

const StyledItemCard = styled.div`
  width: calc(100% -6px);
  height: 72px;
  border-radius: 12px;
  border: 3px solid;
  /* box-sizing: border-box; */
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  justify-content: space-between;
`;
const ItemImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 8px 0px 0px 8px;
  box-sizing: border-box;
  //   background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  background: url(./image/item-sample.png);
  background-size: cover;
`;
const ItemInfo = styled.div`
  width: calc(100% - 160px);
  height: 72px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  background-color: white;
`;
const ItemBtn = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
export default function ItemCard({
  item = {},
  buttonType,
  isReview,
  isSeller,
}) {
  const navigate = useNavigate();
  const userInfo = useSelector(checkUserInfo);
  const senderId = userInfo.id;
  const [chatRoomId, setChatRoomId] = useState(item.chatRoomId);
  const getChatRoomId = (receiverId) => {
    createChatRoom({senderId: senderId, receiverId: receiverId}, ({ data }) => {
      setChatRoomId(data)
    });
  };
  return (
    <StyledItemCard>
      <ItemImage />
      <ItemInfo>
        <div className="body1-header">{item.productName || "제품명"}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="body1-regular">
            {isSeller ? "제안자" : item.otherId}
          </div>
          <div className="body1-regular">{item.soldPrice || 21500}원</div>
        </div>
      </ItemInfo>
      <ItemBtn>
        {buttonType === "check" ? <Check /> : <></>}
        {buttonType === "saleshistory" ? (
          <ExtraSmallButton name="한개" />
        ) : (
          <></>
        )}
        {buttonType === "purchasedhistory" ? (
          <ExtraSmallButton 
          name="대화하기" 
          buttonClick={() => {
            chatRoomId === 0 && getChatRoomId(item.otherId);
            navigate(`/chat/room`, {
              state: { chatRoomId: chatRoomId, receiverId: item.otherId, receiverName: item.otherName},
            });
            window.location.reload(`/chat/room`);
          }}
          />
        ) : (
          <></>
        )}
        {buttonType === "purchasedhistory" && isReview ? (
          <ExtraSmallButton
            name="후기작성"
            buttonClick={() => {
              navigate("/writereview", {
                state: { productId: item.id, isSellr: isSeller },
              });
            }}
          />
        ) : (
          <></>
        )}
        {buttonType === "purchasedhistory" && !isReview ? (
          <ExtraSmallButton
            name="후기열람"
            buttonClick={() => {
              navigate("/review", {
                state: {
                  myReviewId: item.myReviewId,
                  otherReviewId: item.otherReviewId,
                  otherName: item.otherName,
                },
              });
            }}
          />
        ) : (
          <></>
        )}
      </ItemBtn>
    </StyledItemCard>
  );
}
