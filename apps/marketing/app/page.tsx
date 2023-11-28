import HeroSection from "@meetfaq/marketing/components/HeroSection";
import Features from "@meetfaq/marketing/components/Features";
// import Solution from "@meetfaq/marketing/components/Solution";
import Reviews from "@meetfaq/marketing/components/Reviews";
// import Princing from "@meetfaq/marketing/components/Princing";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'MeetFAQ',
  description: 'MeetFAQ is a tool that helps you to create a FAQ page for your website.',
}
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
      {/*<Solution />*/}
      <Reviews />
      {/*<Princing />*/}
    </>
  );
}
