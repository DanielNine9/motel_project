export interface CreateMotelType {
  name: string;
  nation: string;
  local: string;
  quantity: number;
  desc: string;
  title: string;
  images?: string[];
  amenities: string;
  price: number;
  discount: number;
}

export interface UpdateMotelType {
  name?: string;
  nation?: string;
  local?: string;
  quantity?: number;
  desc?: string;
  title?: string;
  images?: string[];
  //   images?: { id: number; fileName: string }[];
  amenities?: string;
  price?: number;
  discount?: number;
}
