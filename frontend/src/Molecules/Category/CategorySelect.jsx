import React from "react";
import CategoryBtn from "../../Atoms/Buttons/CategoryBtn";
import Select from "../../Atoms/Select/BigSelect";
export default function CategorySelect({
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
            <CategoryBtn key={ele} categoryName={ele} onClose={delCategory} />
          );
        })}
      </div>
    </div>
  );
}
