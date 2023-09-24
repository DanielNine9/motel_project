"use client";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import BlogLargeItem from "./BlogLargeItem";
import axios from "axios";

type Props = {};

const BlogList = (props: Props) => {
  const [dataList, setDataList] = useState([]); // Sử dụng useState để lưu trữ danh sách phần tử từ API
  const [loading, setLoading] = useState(true); // Sử dụng để kiểm tra trạng thái loading
  const [error, setError] = useState<any>(null); // Sử dụng để xử lý lỗi

  useEffect(() => {
    // Sử dụng Axios để gọi API
    axios
      .get("http://localhost:3000/motel/topSelling")
      .then((response) => {
        // Lấy dữ liệu từ API và cập nhật danh sách dataList
        setDataList(response.data.data);
        console.log(response.data.data);
        setLoading(false); // Dừng loading khi dữ liệu đã sẵn sàng
      })
      .catch((err) => {
        setError(err); // Xử lý lỗi nếu có
        setLoading(false); // Dừng loading khi xảy ra lỗi
      });
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi thành phần được render

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo loading trong quá trình lấy dữ liệu
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hiển thị thông báo lỗi nếu có lỗi xảy ra
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800">
              This Week Blogs
            </h1>
            <p className="text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12">
              If you're looking for random paragraphs, you've come to the right
              place. When a random word or a random sentence isn't quite enough
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[-80px] container mx-auto flex gap-10 flex-col lg:flex-row 2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-6 w-96 sm:w-auto">
        <div className="lg:flex items-stretch md:mt-4 mt-8 gap-8">
          <div className="lg:w-1/2 gap-8 flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {dataList.slice(1, 3).map((item, index) => (
                <BlogItem motel={item} key={index} />
              ))}
            </div>
            <BlogLargeItem motel={dataList[0]} />
          </div>

          <div className="lg:w-1/2 gap-8 flex flex-col-reverse">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {dataList.slice(4, 6).map((item, index) => (
                <BlogItem motel={item} key={index} />
              ))}
            </div>
            <BlogLargeItem motel={dataList[3]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
