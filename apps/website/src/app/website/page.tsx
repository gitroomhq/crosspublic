import HeroSectionComponent from "@meetqa/website/src/components/website/hero.section.component";
import FeaturesComponent from "@meetqa/website/src/components/website/features.component";
import SolutionComponent from "@meetqa/website/src/components/website/solution.component";
import ReviewsComponent from "@meetqa/website/src/components/website/reviews.component";
import PricingSectionComponent from "@meetqa/website/src/components/website/pricing.section.component";

export const dynamic = 'force-static';

export default async function Page() {

  return (
    <>
      <HeroSectionComponent/>
      <FeaturesComponent />
      <SolutionComponent />
      <ReviewsComponent />
      <PricingSectionComponent />
    </>
  )
}
