"use client";

import { Motel, ResponseMotel } from "@/common/types";
import { getMotelsAPI } from "@/httpRequest";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { Pagination, Stack } from "@mui/material";

type Props = {};

const BlogList = (props: Props) => {
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
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20">
          {prods?.responseData?.length &&
            prods?.responseData.map((prod: Motel) => (
              <BlogItem key={prod.id} motel={prod} />
            ))}
        </div>

        <Stack alignItems={"center"}>
          <Pagination
            count={prods?.totalPages}
            shape="rounded"
            boundaryCount={1}
            onChange={(event, pageNumber) =>
              pageChangeHandler(event, pageNumber)
            }
          />
        </Stack>
      </div>
    </>
  );
};

export default BlogList;
