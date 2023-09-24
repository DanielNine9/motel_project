import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { logout } from "@/httpRequest";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  let currentUser: any = useSelector(
    (state: StoreState) => state.auth.userInfo
  );
  const dispatch = useDispatch();
  const router = useRouter();
  async function handleLogout(): Promise<void> {
    try {
      const res = await logout(currentUser.accessToken, dispatch);
      if (!(res.statusCode === 200)) {
        return console.log(res.data);
      }
      currentUser = null;
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePost() {
    if (!currentUser) {
      router.push("/auth/login");
    }
  }

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center py-3 container mx-auto ">
        <Link href="/" className="">
          Motel
        </Link>
        <div className="flex gap-4 items-center text-[14px]">
          <Link className="hover:text-green-400" href={""}>
            Tìm mua
          </Link>
          <Link className="hover:text-green-400" href={""}>
            Tìm thuê
          </Link>
          <Link className="hover:text-green-400" href={""}>
            Giá nhà đất
          </Link>
          <Link className="hover:text-green-400" href={"/feedback"}>
            Hỏi đáp
          </Link>
          <Link className="hover:text-green-400" href={""}>
            Môi giới
          </Link>
          <Link className="hover:text-green-400" href={"/blog"}>
            Tin tức
          </Link>
          {currentUser ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <img
                    className="w-10 h-10 rounded-full shadow"
                    src={currentUser.imageURL}
                    alt=""
                  />
                  <span className="text-lg font-medium">
                    {currentUser.username}
                  </span>
                </div>
                <div className="h-[30px] w-[70px] right-0 bg-transparent absolute top-8"></div>
                <div className="group-hover:opacity-100 group-hover:block top-10 opacity-0 hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 px-4 transition-opacity duration-300 z-10">
                  <Link
                    href="/my-profile"
                    className="block text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    My Profile
                  </Link>
                  <hr className="my-2 border-t border-gray-300" />

                  {currentUser?.role == "ADMIN" ? (
                    <>
                      <Link
                        href="/user-management"
                        className="block text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        User Management
                      </Link>
                      <Link
                        href="create-product"
                        className="block text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        Create Product
                      </Link>
                      <Link
                        href="myProduct"
                        className="block text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        My Products
                      </Link>
                    </>
                  ) : currentUser?.role == "SELLER" ? (
                    <>
                      <Link
                        href="create-product"
                        className="block text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        Create Product
                      </Link>
                      <Link
                        href="myProduct"
                        className="block text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        My Products
                      </Link>
                    </>
                  ) : null}
                  <hr className="my-2 border-t border-gray-300" />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-700 hover:text-black cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link className="hover:text-green-400" href={"/auth/login"}>
                Đăng nhập
              </Link>
            </>
          )}

          <Link
            href={""}
            className="border border-green-400 px-4 py-1 rounded-[4px] font-semibold hover:text-green-300"
            onClick={handlePost}
          >
            Đăng tin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
