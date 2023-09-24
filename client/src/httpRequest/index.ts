import { loginSuccess } from "@/redux/authSlice";
import axios from "./axios";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { useRouter } from "next/navigation";

export const getTopSellingAPI = async () => {
  try {
    const res = await axios.get("motel/topSelling");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMotelsAPI = async (query: any | undefined = undefined) => {
  try {
    const res = await axios.get(
      `motel?${query?.pageNumber ? `pageNumber=${query?.pageNumber}` : ""}`
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMotelAPI = async (motelId: string | number) => {
  try {
    const res = await axios.get(`motel/${motelId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginAPI = async (
  login: { email: string; password: string },
  dispatch: Dispatch,
  router: ReturnType<typeof useRouter>
) => {
  try {
    const res = await axios.post(`auth/login`, login);
    dispatch(loginSuccess(res.data.data));
    router.push("/");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const logout = async (accessToken: string, dispatch: Dispatch) => {
  console.log(accessToken);

  try {
    const res = await axios.post(
      `auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(loginSuccess(null));
    return res.data;
  } catch (err) {
    return err;
  }
};

export const checkTimeNew = (date: string) => {
  // Thời điểm hiện tại
  const currentDate = new Date();

  // Thời điểm trong tương lai (đã cung cấp)
  const futureDate = new Date(date);

  // Chuyển đổi thời điểm thành UNIX timestamp (milliseconds since epoch)
  const currentTimestamp = currentDate.getTime();
  const futureTimestamp = futureDate.getTime();

  // Tính khoảng cách thời gian giữa hai thời điểm
  const timeDifferenceInMilliseconds = futureTimestamp - currentTimestamp;

  // Khoảng cách 3 ngày tính theo milliseconds
  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;

  // So sánh và trả về kết quả
  const isWithinThreeDays =
    timeDifferenceInMilliseconds < threeDaysInMilliseconds;
  return isWithinThreeDays;
};
