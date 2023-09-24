import { AppBar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Typography } from "@mui/material";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between container mx-auto items-center py-4">
      <div className="flex items-center gap-4">
        <Image
          width={50}
          height={50}
          className="rounded-full bg-cover shadow-lg"
          alt="Logo"
          src="/images/logo.jpg" // Đường dẫn hình ảnh tương đối từ thư mục 'public'
        />
        <Typography></Typography>
        <h1>Motel</h1>
      </div>
    </header>
  );
};

export default Header;
