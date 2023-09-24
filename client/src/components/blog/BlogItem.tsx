import { Motel } from "@/common/types";
import { checkTimeNew } from "@/httpRequest";
import React from "react";

type Props = {
  motel: Motel;
};

const BlogItem = (props: Props) => {
  const { motel } = props;
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={
              motel.images[0].fileName
                ? "http://localhost:3000/public/images/" +
                  motel.images[0].fileName
                : "https://via.placeholder.com/600x360"
            }
          />
          {checkTimeNew(motel.created_at) ? (
            <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">
              New
            </div>
          ) : (
            ""
          )}
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
            {motel.reviews} người xem
          </div>
        </div>
        <div className="p-4">
          <div className="text-lg font-medium text-gray-800 mb-2">
            {motel.name}
          </div>
          <p className="text-gray-500 text-sm">{motel.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
