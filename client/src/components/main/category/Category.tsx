import React from "react";
import CategoryItem from "./CategoryItem";

type Props = {};

const types = [
  {
    header: "Loại bất động sản",
    list: [
      { type: "Nhà trọ", count: 1098, link: "" },
      { type: "Phòng trọ lối đi riêng", count: 136, link: "" },
      { type: "Phòng trọ ở chung chủ", count: 34, link: "" },
      { type: "Phòng trọ ở ghép", count: 86, link: "" },
    ],
  },
  {
    header: "Lọc theo diện tích",
    list: [
      { type: "Dưới 20", link: "" },
      { type: "10 - 20", link: "" },
      { type: "20 - 30", link: "" },
      { type: "30 - 40", link: "" },
      { type: "40 - 50", link: "" },
    ],
  },
  {
    header: "Lọc theo tình trạng nội thất",
    list: [
      { type: "Nội thất cao cấp", link: "" },
      { type: "Nội thất đầy đủ", link: "" },
      { type: "Nội thất trống", link: "" },
    ],
  },
  {
    header: "Lọc theo địa điểm",
    list: [
      { type: "Quận Ninh Kiều", link: "link_quan_ninh_kieu" },
      { type: "Quận Bình Thủy", link: "link_quan_binh_thuy" },
      { type: "Quận Cái Răng", link: "link_quan_cai_rang" },
      { type: "Quận Ô Môn", link: "link_quan_o_mon" },
    ],
  },
];

const statusTypes = {};

const Category = (props: Props) => {
  return (
    <div className="flex-col hidden sm:flex  gap-4">
      {types.map((type) => (
        <CategoryItem data={type} />
      ))}
    </div>
  );
};

export default Category;
