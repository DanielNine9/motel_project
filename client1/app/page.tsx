"use client";
import Banner from "@/components/Banner";
import Filter from "@/components/Filter";
import MotelList from "@/components/MotelList";
import TopProduct from "@/components/TopProduct";
import Advertisement from "@/components/ads/Advertisement";
import Blog from "@/components/blog/Blog";
import BlogList from "@/components/blog/BlogList";
import TeamList from "@/components/teamUI/TeamList";

export default function Home() {
  return (
    <div className="">
      {/* <Banner /> */}
      {/* <Blog /> */}
      <BlogList />
      <Advertisement />
      {/* <MotelList /> */}
      {/* <TeamList /> */}
    </div>
  );
}
