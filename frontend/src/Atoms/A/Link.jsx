import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.green};
`;

export default function BigButtonColor({ link, value }) {
  return <StyledLink to={link}>{value}</StyledLink>;
}
