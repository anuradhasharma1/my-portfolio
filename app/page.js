import Image from "next/image";
import GridDots from "@/components/GridDot";
import Intro from "@/components/Intro";
import GithubActivity from "@/components/GithubActivity";

export default function Home() {
  return (
    <>
      <GridDots />
      <Intro />
      <GithubActivity />

    </>
  );
}
