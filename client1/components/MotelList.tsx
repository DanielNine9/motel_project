"use client";
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import MotelItem from "./MotelItem";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import Filter from "./Filter";

type Props = {};

const MotelList = (props: Props) => {
  // Tạo một mảng các đối tượng khách sạn với dữ liệu
  const [active, setActive] = React.useState(1);

  const getItemProps = (index: number) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  const motelData = [
    {
      id: 1,
      name: "Hotel",
      rate: 5,
      desc: "Lorem  jsdhfah",
    },
    {
      id: 2,
      name: "Hotel",
      rate: 5,
      desc: "Lorem  jsdhfah",
    },
    {
      id: 3,
      name: "Hotel",
      rate: 5,
      desc: "Lorem  jsdhfah",
    },
    {
      id: 4,
      name: "Hotel",
      rate: 5,
      desc: "Lorem  jsdhfah",
    },
    {
      id: 5,
      name: "Hotel",
      rate: 5,
      desc: "Lorem  jsdhfah",
    },
  ];

  return (
    <>
      <Filter />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {motelData.map((motel) => (
            <MotelItem key={motel.id} motel={motel} />
          ))}
        </div>
        <Stack alignItems={"center"}>
          <Pagination count={1} shape="rounded" boundaryCount={1} />
        </Stack>
      </div>
    </>
  );
};

export default MotelList;
