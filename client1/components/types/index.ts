export interface Motel {
  id: number;
  name: string;
  nation: string;
  local: string;
  booked: number;
  quantity: number;
  reviews: number;
  desc: string;
  title: string;
  amenities: string;
  price: number;
  discount: number;
  deleted: boolean;
  idUser: number;
  created_at: string;
  updated_at: string;
  host: {
    id: number;
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    address: string;
  };
  images: [
    {
      id: number;
      fileName: string;
    }
  ];
}

type Props = {
  motel: Motel;
};
