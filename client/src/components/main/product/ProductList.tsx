"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getMotelsAPI, getTopSellingAPI } from "@/httpRequest";
import { Motel, ResponseMotel } from "@/common/types";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { data } from "autoprefixer";

type Props = {};

const ProductList = (props: Props) => {
  const [prods, setProds] = useState<ResponseMotel>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    async function getProd() {
      const data = await getMotelsAPI({ pageNumber });
      if (data?.data) {
        setProds(data?.data);
      }
      console.log(data);
    }
    getProd();
  }, [pageNumber]);

  function pageChangeHandler(
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ): void {
    setPageNumber(pageNumber);
  }

  return (
    <div className="flex flex-col gap-4">
      {prods?.responseData?.length &&
        prods?.responseData.map((prod) => (
          <ProductItem key={prod.id} prod={prod} />
        ))}
      <Stack alignItems={"center"}>
        <Pagination
          count={prods?.totalPages}
          shape="rounded"
          boundaryCount={1}
          onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
        />
      </Stack>
    </div>
  );
};

export default ProductList;
