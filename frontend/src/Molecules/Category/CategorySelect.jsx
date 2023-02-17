import React from "react";
import styled from "styled-components";
import CategoryBtn from "../../Atoms/Buttons/CategoryBtn";
import Select from "../../Atoms/Select/BigSelect";

const StyledCategorySelectBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledCategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 8px;
  column-gap: 8px;
  align-content: flex-start;
`;
export default function CategorySelect({
  options,
  categorys,
  onChange,
  delCategory,
}) {
  return (
    <StyledCategorySelectBox>
      <Select options={options} onChange={onChange} />
      <StyledCategoryBox>
        {categorys.map((ele, i) => {
          return (
            <CategoryBtn
              key={ele}
              categoryName={ele}
              onClose={delCategory}
              center={i % 3 === 1}
            />
          );
        })}
      </StyledCategoryBox>
    </StyledCategorySelectBox>
  );
}
