import React from "react";
import styled from "styled-components";

const StyledCategoryBtn = styled.button`
  // 이부분이 잘모르겠는게 안에 텍스트 내용에 따라서 사이즈가 바뀔것.
  width: 64px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function CategoryNavBtn({ name, buttonClick }) {
  return (
    <StyledCategoryBtn className="body2-bold" onClick={buttonClick}>
      카테고리
    </StyledCategoryBtn>
  );
}
