import React from "react";
import { Motel } from "../types";

interface Props {
  motel: Motel;
  reverse?: boolean;
}

const AdvertisementItem = ({ motel, reverse = false }: Props) => {
  console.log(motel.images);
  return (
    <div>
      <div className={`container mx-auto lg:px-20 md:px-6 px-4 md:py-12 py-8`}>
        <div
          className={`lg:flex items-center justify-between ${
            reverse && "flex-row-reverse"
          }`}
        >
          <div className="lg:w-1/3">
            <h1 className="text-4xl font-semibold leading-9 text-gray-800">
              {motel.name}
            </h1>
            <p className="text-base leading-6 mt-4 text-gray-600">
              {motel.desc}
            </p>
            <button
              aria-label="view catalogue"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none mt-6 md:mt-8 text-base font-semibold leading-none text-gray-800 flex items-center hover:underline"
            >
              View Catalogue
              <svg
                className="ml-2 mt-1"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33325 4H10.6666"
                  stroke="#1F2937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6.66667L10.6667 4"
                  stroke="#1F2937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 1.33398L10.6667 4.00065"
                  stroke="#1F2937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="lg:w-7/12 lg:mt-0 mt-8">
            <div className="w-full h-full bg-red-200">
              <img
                src={
                  motel?.images?.[0]?.fileName
                    ? `http://localhost:3000/public/images/${motel.images[0].fileName}`
                    : "https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg"
                }
                alt="apartment design"
                className="w-full h-[full] sm:h-[240px] bg-cover"
              />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 gap-6 lg:mt-8 md:mt-6 mt-4">
              {motel.images?.length &&
                motel.images.map((image: any, index) => {
                  if (index === 0) {
                    return;
                  }
                  return (
                    <img
                      key={index}
                      src={
                        image.fileName
                          ? `http://localhost:3000/public/images/${image.fileName}`
                          : "https://canthoplus.com/wp-content/uploads/2020/02/xay-nha-tro-can-tho.jpg"
                      }
                      className="w-full bg-cover h-[242px]"
                      alt={motel.name}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementItem;
