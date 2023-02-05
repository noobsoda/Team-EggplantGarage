import React from "react";
import styled from "styled-components";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";

const StyledBundleBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: calc(100% - 18px);
  border-radius: 16px;
  padding: 4px;
  border: 5px solid;
  /* background-color: white; */
`;
const Status = styled.div`
  height: 56px;
  display: flex;
  column-gap: 8px;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 8px;
`;
const InfoBox = styled.div`
  width: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
`;
export default function BundleBox(props) {
  return (
    <StyledBundleBox>
      {props.children}
      <Status>
        <InfoBox>
          <div className="body1-header">제안자</div>
          <div className="body1-header">제안가격</div>
        </InfoBox>
        <BtnBox>
          <ExtraSmallButton />
          <ExtraSmallButton />
        </BtnBox>
      </Status>
    </StyledBundleBox>
  );
}
