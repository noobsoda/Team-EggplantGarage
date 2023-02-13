import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.green};
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  transition: 0.3s;
  margin: 16px;
`;

export default function BigButtonColor({ link, value }) {
  return <StyledLink to={link}>{value}</StyledLink>;
}
