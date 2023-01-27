import React from "react";
import SmallNumBox from "../../Atoms/Text/SmallNumBox";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  width: 280px;
  height: 64px;
  border: 1.5px solid ${({ theme }) => theme.color.red};
  border-radius: 8px;
`;

export default function ChatRoomBox({ name, price, onClick }) {
  return (
    <StyledBox>
      <div>
        <span className="body2-bold">상대방</span>
        <span className="body2-regular">메세지</span>
      </div>
      <div>
        <span className="body3-bold">오후1:40</span>
        <div>
          <SmallNumBox number="3" />
        </div>
      </div>
    </StyledBox>
  );
}
