import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";
import Check from "../../Atoms/Inputs/Check";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../../util/api/chatApi";
import { checkUserInfo } from "../../store/user";
import ImageBox from "../../Atoms/canvas/ImageBox";

import { getImage } from "../../util/api/productApi";

const StyledItemCard = styled.div`
  position: relative;
  width: calc(100% -6px);
  height: 72px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.lightgrey};
  /* box-sizing: border-box; */
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  justify-content: space-between;
  box-shadow: 0px 0px 20px ${({ theme }) => theme.color.lightgrey};
  // overflow: hidden;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  background-color: rgb(10, 10, 10, 0.7);
  color: red;
`;
const ItemImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 8px 0px 0px 8px;
  box-sizing: border-box;
  background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  /* background: url(./image/item-sample.png); */
  background-size: cover;
`;
const ItemInfo = styled.div`
  width: calc(100% - 160px);
  height: 72px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  background-color: white;
  justify-content: center;
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
  isSaleList,
  check,
  setCheck,
  isSold,
}) {
  const navigate = useNavigate();
  const userInfo = useSelector(checkUserInfo);
  const senderId = userInfo.id;
  const [chatRoomId, setChatRoomId] = useState(item.chatRoomId);
  const createChatRoomAndMove = (receiverId) => {
    createChatRoom(
      { senderId: senderId, receiverId: receiverId },
      ({ data }) => {
        navigate(`/chat/room`, {
          state: {
            chatRoomId: data.chatRoomId,
            receiverId: item.otherId,
            receiverName: item.otherName,
          },
        });
        window.location.reload(`/chat/room`);
      }
    );
  };
  return (
    <StyledItemCard>
      <ImageBox
        imgSrc={getImage(item.imageUrl)}
        leftTopX={item.leftTopX}
        rightBottomX={item.rightBottomX}
        leftTopY={item.leftTopY}
        rightBottomY={item.rightBottomY}
        boxSize="72"
      />
      <ItemInfo>
        <div className="body1-header">{item.productName || "제품명"}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="body1-regular">
            {/* {isSeller ? "제안자" : item.otherId} */}
          </div>

          <div className="body1-regular">
            {isSaleList ? item.initialPrice : item.soldPrice || 0}원
          </div>
        </div>
      </ItemInfo>
      {isSold ? (
        <ItemBtn />
      ) : (
        <ItemBtn>
          {buttonType === "check" ? (
            <Check check={check} setCheck={setCheck} disable={item.paid} />
          ) : (
            <></>
          )}
          {buttonType === "saleshistory" ? (
            <ExtraSmallButton name="한개" />
          ) : (
            <></>
          )}
          {buttonType === "purchasedhistory" ? (
            <ExtraSmallButton
              name="대화하기"
              buttonClick={() => {
                if (chatRoomId === 0) {
                  createChatRoomAndMove(item.otherId);
                  return;
                }
                navigate(`/chat/room`, {
                  state: {
                    chatRoomId: chatRoomId,
                    receiverId: item.otherId,
                    receiverName: item.otherName,
                  },
                });
                window.location.reload(`/chat/room`);
                console.log(chatRoomId);
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
                  state: { productId: item.id, isSeller: isSeller },
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
      )}
      {isSold ? <Mask className="page-header">판매완료</Mask> : undefined}
    </StyledItemCard>
  );
}
