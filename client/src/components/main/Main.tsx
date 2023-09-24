import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import Category from "./category/Category";
import ProductList from "./product/ProductList";

type Props = {};

const Main = (props: Props) => {
  return (
    <div className="flex gap-4 container mx-auto justify-between py-4">
      <div className="w-9/12">
        <ProductList />
      </div>
      <div className="w-3/12">
        <Category />
      </div>
    </div>
  );
};

export default Main;
