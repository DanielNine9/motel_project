import React from "react";

type Props = {
  data: {
    header: string;
    list: { type: string; count?: number }[];
  };
};

const CategoryItem = (props: Props) => {
  const { data } = props;
  return (
    <div className="rounded-lg border border-gray-300 p-6 py-3 w-full">
      <h3 className="font-semibold text-[14px]">{data.header}</h3>
      {data.list.map((item, index) => (
        <div
          key={index}
          className="flex text-[12px] justify-between hover:text-green-400 cursor-pointer"
        >
          <p>{item.type}</p>
          {item.count && <p>({item.count})</p>}
        </div>
      ))}
    </div>
  );
};

export default CategoryItem;
