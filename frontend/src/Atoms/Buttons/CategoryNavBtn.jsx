import React from "react";
import styled from "styled-components";

const StyledCategoryBtn = styled.div`
  // 이부분이 잘모르겠는게 안에 텍스트 내용에 따라서 사이즈가 바뀔것.
  height: 19.5px;
  padding: 3.5px 12px 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  flex: 0 0 auto;
  text-align: center;
  vertical-align: middle;
`;
const StyledCategoryBtn2 = styled.div`
  // 이부분이 잘모르겠는게 안에 텍스트 내용에 따라서 사이즈가 바뀔것.
  height: 16.5px;
  padding: 1.5px 10px 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  border: 2px solid;
  /* box-sizing: border-box; */
  border-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.red};
  flex: 0 0 auto;
  text-align: center;
  vertical-align: middle;
`;

export default function CategoryNavBtn({
  name = "전체",
  buttonClick,
  isSelected,
}) {
  return (
    <>
      {isSelected ? (
        <StyledCategoryBtn className="body2-bold" onClick={buttonClick}>
          {name}
        </StyledCategoryBtn>
      ) : (
        <StyledCategoryBtn2 className="body2-bold" onClick={buttonClick}>
          {name}
        </StyledCategoryBtn2>
      )}
    </>
  );
}
