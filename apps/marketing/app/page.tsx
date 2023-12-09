import HeroSection from "@crosspublic/marketing/components/HeroSection";
import Features from "@crosspublic/marketing/components/Features";
import Solution from "@crosspublic/marketing/components/Solution";
import Reviews from "@crosspublic/marketing/components/Reviews";
import Princing from "@crosspublic/marketing/components/Princing";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'crosspublic - Support Channels into a Public FAQ with AI',
  description: 'Not all of your customers are on your support channels. Extract your FAQ to make it available to everyone.',
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
      <Solution />
      <Reviews />
      <Princing />
    </>
  );
}
