import React from "react";
import CategoryButton from "../Molecules/CategoryBtn";
import Select from "../Atoms/Select/BigSelect";
export default function CategoryBox() {
  return (
    <div>
      <Select options={["선택 1", "선택 2", "선택 3"]} />
      <CategoryButton categoryName="카테고리" />
    </div>
  );
}
