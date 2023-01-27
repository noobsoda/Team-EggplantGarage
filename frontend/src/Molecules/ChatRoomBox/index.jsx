import React from "react";
import Button from "../../Atoms/Buttons/ExtraSmallBtn";
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
        <div>상대방</div>
        <div>메세지</div>
      </div>
      <div>
        <div>오후1:40</div>
        <div>3</div>
      </div>
    </StyledBox>
  );
}
