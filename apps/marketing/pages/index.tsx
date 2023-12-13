import HeaderSection from "@crosspublic/marketing/components/HeaderSection";
import Footer from "@crosspublic/marketing/components/FooterSection";
import HeroSection from "@crosspublic/marketing/components/HeroSection";
import Features from "@crosspublic/marketing/components/Features";
import Solution from "@crosspublic/marketing/components/Solution";
import Reviews from "@crosspublic/marketing/components/Reviews";
import Princing from "@crosspublic/marketing/components/Princing";

export default function RootLayout({
  stars
}: {
  stars: string
}) {
  return (
    <>
      <HeaderSection stars={stars} />
      <div className="min-h-screen flex flex-col gap-[40px]">
        <main className="flex-1 flex flex-col">
          <HeroSection/>
          <Features />
          <Solution />
          <Reviews />
          <Princing />
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const {stargazers_count} = await (await fetch(`https://api.github.com/repos/github-20k/crosspublic`)).json();
  return {
    props: {
      stars: stargazers_count
    },
    revalidate: 3600
  }
}
