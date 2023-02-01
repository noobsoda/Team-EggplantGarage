import React from "react";
import styled from "styled-components";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";
import Check from "../../Atoms/Inputs/Check";
import { useNavigate } from "react-router-dom";

const StyledItemCard = styled.div`
  width: 280px;
  height: 72px;
  border-radius: 8px;
  border: 1.5px solid #d3385a;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  margin: 8px 0;
`;
const ItemImage = styled.div`
  width: 72px;
  height: 72px;
  border: 1.5px solid #d3385a;
  border-radius: 8px 0px 0px 8px;
  //   background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  background: url(./image/item-sample.png);
  background-size: cover;
`;
const ItemInfo = styled.div`
  width: 136px;
  height: 72px;
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
export default function ItemCard({ item, buttonType }) {
  const navigate = useNavigate();
  return (
    <StyledItemCard>
      <ItemImage />
      <ItemInfo>
        <div className="body1-header" style={{ padding: "8px" }}>
          제품명
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="body2-bold" style={{ padding: "8px" }}>
            제안자
          </div>
          <div className="body2-bold" style={{ padding: "8px" }}>
            즉시구매가
          </div>
        </div>
      </ItemInfo>
      <ItemBtn>
        {buttonType === "check" ? <Check /> : <></>}
        {buttonType === "one" ? <ExtraSmallButton name="한개" /> : <></>}
        {buttonType === "purchasedhistory" ? (
          <ExtraSmallButton name="대화하기" />
        ) : (
          <></>
        )}
        {buttonType === "purchasedhistory" ? (
          <ExtraSmallButton
            name="리뷰작성"
            buttonClick={() => {
              navigate("/writereview");
            }}
          />
        ) : (
          <></>
        )}
      </ItemBtn>
    </StyledItemCard>
  );
}
