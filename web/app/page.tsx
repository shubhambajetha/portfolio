import { FirstSection } from "./components/homepage/FirstSection";
import { ThirdSection } from "./components/homepage/ThirdSection";
import { FourthSection } from "./components/homepage/FourthSection";
import FifthSection from "./components/homepage/FifthSection";
import SixthSection from "./components/homepage/SixthSection";
import SevenSection from "./components/homepage/SevenSection";
import { MediumSwiper } from "./components/homepage/MediumSwiper";

export default function Home() {
  return (
   <div className="">
    <FirstSection/>
    <ThirdSection/>
    <FifthSection/>
    <FourthSection/>
    <SixthSection/>
    <MediumSwiper />
    <SevenSection/>
   </div>
  );
}
