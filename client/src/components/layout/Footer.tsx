import Link from "next/link";
import React from "react";

type Props = {};

const footerData = [
  {
    header: "Bất động sản TPHCM",
    links: [
      { title: "Mua bán nhà đất TPHCM", link: "/mua-ban-nha-dat-tphcm" },
      { title: "Bán nhà quận 7", link: "/ban-nha-quan-7" },
      { title: "Căn hộ quận 7", link: "/can-ho-quan-7" },
      { title: "Bán đất quận 9", link: "/ban-dat-quan-9" },
      { title: "Phòng trọ quận 10", link: "/phong-tro-quan-10" },
      { title: "Cho thuê nhà quận 8", link: "/cho-thue-nha-quan-8" },
    ],
  },
  {
    header: "Bất động sản Hà Nội",
    links: [
      { title: "Bán đất Hà Nội", link: "/ban-dat-hanoi" },
      { title: "Bán nhà Hà Nội", link: "/ban-nha-hanoi" },
      { title: "Cho thuê nhà Hà Nội", link: "/cho-thue-nha-hanoi" },
      { title: "Chung cư Hà Nội", link: "/chung-cu-hanoi" },
      { title: "Nhà đất Hà Nội", link: "/nha-dat-hanoi" },
      { title: "Phòng trọ Hà Nội", link: "/phong-tro-hanoi" },
    ],
  },
  {
    header: "Dịch vụ và Hỗ trợ",
    links: [
      { title: "Về Mogi", link: "/ve-mogi" },
      { title: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
      { title: "Quy chế hoạt động", link: "/quy-che-hoat-dong" },
      { title: "Thỏa thuận mạng XH", link: "/thoa-thuan-mang-xh" },
      { title: "Liên Hệ", link: "/lien-he" },
    ],
  },
  {
    header: "Dịch vụ và Hỗ trợ",
    links: [
      { title: "Về Mogi", link: "/ve-mogi" },
      { title: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
      { title: "Quy chế hoạt động", link: "/quy-che-hoat-dong" },
      { title: "Thỏa thuận mạng XH", link: "/thoa-thuan-mang-xh" },
      { title: "Liên Hệ", link: "/lien-he" },
    ],
  },
  {
    header: "Dịch vụ và Hỗ trợ",
    links: [
      { title: "Về Mogi", link: "/ve-mogi" },
      { title: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
      { title: "Quy chế hoạt động", link: "/quy-che-hoat-dong" },
      { title: "Thỏa thuận mạng XH", link: "/thoa-thuan-mang-xh" },
      { title: "Liên Hệ", link: "/lien-he" },
    ],
  },
  {
    header: "Dịch vụ và Hỗ trợ",
    links: [
      { title: "Về Mogi", link: "/ve-mogi" },
      { title: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
      { title: "Quy chế hoạt động", link: "/quy-che-hoat-dong" },
      { title: "Thỏa thuận mạng XH", link: "/thoa-thuan-mang-xh" },
      { title: "Liên Hệ", link: "/lien-he" },
    ],
  },
  {
    header: "Dịch vụ và Hỗ trợ",
    links: [
      { title: "Về Mogi", link: "/ve-mogi" },
      { title: "Điều khoản sử dụng", link: "/dieu-khoan-su-dung" },
      { title: "Quy chế hoạt động", link: "/quy-che-hoat-dong" },
      { title: "Thỏa thuận mạng XH", link: "/thoa-thuan-mang-xh" },
      { title: "Liên Hệ", link: "/lien-he" },
    ],
  },
];

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#e9e9e9] py-[30px]">
      <div className="grid grid-cols-10 container mx-auto gap-10">
        <h1 className="col-span-3">
          <div className="px-2">
            <h2 className="text-2xl">Motel</h2>
            <div className="text-[12px]">
              <p>0944242140</p>
              <p>huydqpc07859@gmail.com</p>
              <p>
                Địa chỉ trường: Đ. Số 22, Thường Thạnh, Cái Răng, Cần Thơ
                900000, Việt Nam, Can Tho, Vietnam
              </p>
            </div>
          </div>
        </h1>
        <div className="grid grid-cols-4 col-span-7 gap-10">
          {footerData.map((data) => {
            return (
              <div className="">
                <h1 className="text-[14px] font-semibold mb-[4px]">
                  {data.header}
                </h1>
                {data.links.map((link: { title: string; link: string }) => (
                  <div
                    key={link.title}
                    className="text-gray-500 text-[13px] hover:text-green-400"
                  >
                    <Link href={link.link}>{link.title}</Link>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
