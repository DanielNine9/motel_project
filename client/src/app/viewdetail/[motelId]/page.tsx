"use client";
import { Motel } from "@/common/types";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMotelAPI } from "@/httpRequest";
import Image from "next/image";
import { formatDate } from "@/common";
import { Skeleton } from "@mui/material";

type Props = {
  motel: Motel;
};

const viewDetailPage = (props: Props) => {
  const { motelId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Motel | null>(null);
  const [currentImage, setCurrentImage] = useState<String>("");
  useEffect(() => {
    async function getMotel() {
      const data = await getMotelAPI(motelId as string);
      setLoading(false);
      setData(data.data);
      setCurrentImage(data.data.images[0].fileName);
    }
    getMotel();
  }, []);
  return (
    <div>
      {loading && (
        <>
          <div className="flex container mx-auto gap-4 h-screen py-4">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={700}
              height={600}
            />
            <Skeleton
              animation={"pulse"}
              variant="rectangular"
              width={500}
              height={600}
            />
          </div>
        </>
      )}
      {data && (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="w-full mx-auto flex flex-wrap">
              <div className="w-1/2">
                <img
                  alt="ecommerce"
                  className="w-full object-cover object-center rounded border border-gray-200 h-[500px] bg-cover"
                  src={`http://localhost:3000/public/images/${currentImage}`}
                />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {data.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/public/images/${image.fileName}`}
                      alt={data.name}
                      className={`cursor-pointer w-full h-[100px] rounded-md ${
                        image.fileName === currentImage
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setCurrentImage(image.fileName)}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-end">
                    <img
                      src={
                        data.host.imageURL
                          ? `http:localhost:3000/public/images/${data.host.imageURL}`
                          : "https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-trang-cho-nu-de-thuong.jpg"
                      }
                      alt={data.host.lastName}
                      className="w-[50px] h-[50px] shadow"
                    />
                    {data.host.firstName + " " + data.host.lastName}
                  </div>
                  <p>Email: {data.host.email}</p>
                  <div className="text-[14px]">
                    Ngày đăng: {formatDate(data.created_at)}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div className="h-[550px]">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {data.title}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {data.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <span className="text-gray-600">
                        {data.reviews} Người xem
                      </span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                      <a className="ml-2 text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </a>
                      <a className="ml-2 text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p>Khu vực: {data.local}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    Số người đã đặt: {data.booked}/{data.quantity}
                  </div>
                  <p className="leading-relaxed max-h-[300px] overflow-y-scroll">
                    Mô tả: {data.desc} Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Aliquid architecto, perspiciatis
                    consequuntur quas amet natus consequatur qui deleniti neque
                    unde placeat incidunt tenetur dolore asperiores culpa sunt
                    uod laborum quis ex consequuntur. Blanditiis ex, amet
                    ratione voluptas nemo natus officia non deserunt ullam quod
                    laboriosam maxime eos qui explicabo corrupti commodi cum
                    dignissimos animi veritatis odio ipsam? Atque optio rem
                    nostrum assumenda ducimus aspernatur unde iure praesentium
                    quam ipsam ullam voluptatum iste laudantium beatae, quos
                    debitis inventore
                  </p>
                </div>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${data.price}
                  </span>
                  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Hẹn với chủ
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default viewDetailPage;
