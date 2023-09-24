import { formatDate } from "@/common";
import { Motel } from "@/common/types";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  prod: Motel;
};

const ProductItem = ({ prod }: Props) => {
  const router = useRouter();
  function handleDetail(prodId: number): void {
    router.push(`/viewdetail/${prodId}`);
  }

  return (
    <div className="flex flex-col sm:flex-row p-4 gap-4 border border-gray-200 rounded-[4px] shadow hover:cursor-pointer hover:border-green-400 duration-500">
      <div className="w-2/4 rounded-md overflow-hidden shadow-sm ">
        <img
          src={`http://localhost:3000/public/images/${prod.images[0].fileName}`}
          alt=""
          className="w-full h-[250px] bg-cover"
        />
        <p>Ngày đăng: {formatDate(prod.created_at)}</p>
      </div>
      <div className="">
        <div className="h-[77%]">
          <h3>{prod.name}</h3>
          <p>Khu vực: {prod.local}</p>
          <p>Giá: {prod.price}</p>
          <p>Lượt xem: {prod.reviews}</p>
          <p>
            Miêu tả:
            {prod.desc.length < 20 ? prod.desc : prod.desc.slice(0, 20) + "..."}
          </p>
          <p>
            Đã đặt: {prod.booked}/{prod.quantity}
          </p>
        </div>

        <Button
          variant="outlined"
          color="success"
          className="w-[160px]"
          onClick={() => handleDetail(prod.id)}
        >
          <Link href={`/viewdetail/${prod.id}`}>Xem chi tiết</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
