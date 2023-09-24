"use client";

import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";

const country: string[] = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Quảng Ninh",
  "Lào Cai",
  "Sơn La",
  "Nghệ An",
  "Thái Bình",
  "Hà Tĩnh",
  "Hải Dương",
  "Vĩnh Phúc",
  "Bắc Giang",
  "Thái Nguyên",
  "Lạng Sơn",
  "Bắc Ninh",
  "Phú Thọ",
  "Yên Bái",
  "Tuyên Quang",
  "Quảng Bình",
  "Quảng Trị",
  "Thừa Thiên Huế",
  "Quảng Nam",
  "Quảng Ngãi",
  "Bình Định",
  "Phú Yên",
  "Khánh Hòa",
  "Ninh Thuận",
  "Bình Thuận",
  "Kon Tum",
  "Gia Lai",
  "Đắk Lắk",
  "Đắk Nông",
  "Lâm Đồng",
  "Bà Rịa - Vũng Tàu",
  "Bình Dương",
  "Đồng Nai",
  "Tây Ninh",
  "Bình Phước",
  "Long An",
  "Đồng Tháp",
  "Tiền Giang",
  "Bến Tre",
  "Vĩnh Long",
  "Trà Vinh",
  "Sóc Trăng",
  "Cà Mau",
  "Kiên Giang",
  "Hậu Giang",
  "Bạc Liêu",
  "Cần Thơ",
];

const price = [
  "Dưới 1 triệu VND",
  "1 - 2 triệu VND",
  "2 - 3 triệu VND",
  "3 - 4 triệu VND",
  "4 - 5 triệu VND",
  "Trên 5 triệu VND",
];

type Props = {};

const Filter = (props: Props) => {
  return (
    <div className="container mx-auto flex gap-4">
      <TextField fullWidth label="Tìm kiếm" className="w-2/6" />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={country}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Thành phố" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={country}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Phòng trọ" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={price}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Giá thuê" />}
      />
      <Button variant="text" color="success" className="w-[100px]">
        Tìm kiếm
      </Button>
    </div>
  );
};

export default Filter;
