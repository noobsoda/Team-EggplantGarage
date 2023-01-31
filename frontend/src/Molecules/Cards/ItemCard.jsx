import React from "react";
import styled from "styled-components";

const StyledItemCard = styled.div`
  width: 280px;
  height: 72px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.white};
`;

export default function ItemCard({ item, button1Click, button2Click }) {
  return <StyledLiveshowCard></StyledLiveshowCard>;
}
