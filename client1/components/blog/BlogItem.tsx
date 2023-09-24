"use client";
import Image from "next/image";
import React from "react";
interface Motel {
  id: number;
  name: string;
  nation: string;
  local: string;
  booked: number;
  quantity: number;
  reviews: number;
  desc: string;
  title: string;
  amenities: string;
  price: number;
  discount: number;
  deleted: boolean;
  idUser: number;
  created_at: string;
  updated_at: string;
  host: {
    id: number;
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    address: string;
  };
  images: [
    {
      id: number;
      fileName: string;
    }
  ];
}

type Props = {
  motel: Motel;
};

const BlogItem = (props: Props) => {
  const { motel } = props;
  return (
    <div className="sm:w-1/2 relative">
      <div>
        <div className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
          {motel?.created_at}
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-xl font-semibold 5 text-white">{motel?.name}</h2>
          <div className="text-base leading-4 text-white mt-2">
            {motel?.title}
          </div>
          <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
            <div className="pr-2 text-sm font-medium leading-none">
              Read More
            </div>
            <svg
              className="fill-stroke"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 12.5L10.25 8L5.75 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <img
        src={`http://localhost:3000/public/images/${motel?.images[0].fileName}`}
        className="w-full h-[270px] bg-cover"
        alt={motel?.name}
      />
      {/* <img
        src="http://localhost:3000/public/images/1694338282976..jpg"
        alt=""
      /> */}
    </div>
  );
};

export default BlogItem;
