import React, { useEffect, useState } from "react";
import AdvertisementItem from "./AdvertisementItem";
import axios from "axios";
import { Motel } from "../types";

type Props = {};

const initData: Motel = {
  id: 0,
  name: "hello",
  nation: "hello",
  local: "hello",
  booked: 0,
  quantity: 0,
  reviews: 0,
  desc: "hello",
  title: "hello",
  amenities: "hello",
  price: 0,
  discount: 0,
  deleted: false,
  idUser: 0,
  created_at: "hello",
  updated_at: "hello",
  host: {
    id: 0,
    firstName: "hello",
    lastName: "hello",
    contact: "hello",
    email: "hello",
    address: "hello",
  },
  images: [
    {
      id: 0,
      fileName: "hello",
    },
  ],
};

const Advertisement = (props: Props) => {
  const [data, setData] = useState<Motel>(initData); // Sử dụng useState để lưu trữ danh sách phần tử từ API
  const [loading, setLoading] = useState(true); // Sử dụng để kiểm tra trạng thái loading
  const [error, setError] = useState<any>(null); // Sử dụng để xử lý lỗi

  useEffect(() => {
    // Sử dụng Axios để gọi API
    axios
      .get("http://localhost:3000/motel/47")
      .then((response) => {
        // Lấy dữ liệu từ API và cập nhật danh sách dataList
        setData(response.data.data);
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
    <div>
      <AdvertisementItem motel={data as Motel} reverse={true} />;
    </div>
  );
};

export default Advertisement;
