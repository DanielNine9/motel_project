import Filter from "@/components/main/Filter";
import Main from "@/components/main/Main";
import Image from "next/image";

export default function Home() {
  return (
    <main className="py-[20px]">
      <Filter />
      <Main />
    </main>
  );
}
