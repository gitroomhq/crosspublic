import HeroSection from "@meetqa/marketing/components/HeroSection";
import Features from "@meetqa/marketing/components/Features";
import Solution from "@meetqa/marketing/components/Solution";
import Reviews from "@meetqa/marketing/components/Reviews";
import Princing from "@meetqa/marketing/components/Princing";

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      <HeroSection/>
      <Features />
      <Solution />
      <Reviews />
      <Princing />
    </>
  );
}
