import React from "react";
import CategoryButton from "../Molecules/CategoryBtn";
import Select from "../Atoms/Select/BigSelect";
export default function CategoryBox({
  options,
  categorys,
  onChange,
  delCategory,
}) {
  return (
    <div>
      <Select options={options} onChange={onChange} />
      <div>
        {categorys.map((ele) => {
          return (
            <CategoryButton
              key={ele}
              categoryName={ele}
              onClose={delCategory}
            />
          );
        })}
      </div>
    </div>
  );
}
