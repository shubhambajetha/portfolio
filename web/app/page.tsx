import { FirstSection } from "./components/homepage/FirstSection";
import { ThirdSection } from "./components/homepage/ThirdSection";
import { FourthSection } from "./components/homepage/FourthSection";
import FifthSection from "./components/homepage/FifthSection";
import SixthSection from "./components/homepage/SixthSection";
import SevenSection from "./components/homepage/SevenSection";
import { MediumSwiper } from "./components/homepage/MediumSwiper";
import { getalllistings } from "./services/productapi";
import { getallexperience } from "./services/experince";

export default async function Home() {
  const[projectdata, experincedata] = await Promise.all([
    getalllistings(),
    getallexperience(),
  ])
  return (
   <div className="">
    <FirstSection/>
    <ThirdSection experincedata={experincedata.data ?? []}/>
    <FifthSection projectdata={projectdata.data ?? []}/>
    <FourthSection/>
    <SixthSection/>
    <MediumSwiper />
    <SevenSection/>
   </div>
  );
}
