// // import WhyChooseUs from "./Components/whychooseus";
// // import IndustriesServed from "./Components/industriesserved";
// import Products from "./Components/product";
// // import Services from "./Components/services";
// import TopBar from "./Components/topbar";
// import Navbar from "./Components/navbar";
// import Footer from "./Components/footer";
// // import Workflow from "./Components/workflow";
// import Hero from "@/app/Components/hero"
// // import ServicesGrid from "./Components/nc";
// // import BankingServices from "./Components/sf";
// import Overview from "./Components/overview";
// // import Pblog from './Components/pblog';
// import Banner from "./Components/quality-safety-inovation";
// // import News1 from "./Components/news";
// import NewsSection from "./Components/news";
// import ScrollToTopButton from './Components/scroll';




// export default function Home() {
//   return (
//     <div>
//       <TopBar />
//       <Navbar />
//       <Hero />
//       <Overview/>
//       <Products/>
//       <Banner/>
//      <NewsSection/>
//       {/* <Workflow/> */}
//       {/* <WhyChooseUs /> */}
//       {/* <BankingServices/> */}
//        {/* <IndustriesServed /> */}
//        <ScrollToTopButton/>
//        <Footer />
//     </div>
//   );
// }

"use client"
import { ReactElement } from 'react';
import Products from "./Components/product";
// import TopBar from "./Components/topbar";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
// import Hero from "@/app/Components/hero";
import Overview from "./Components/overview";
import Banner from "./Components/quality-safety-inovation";
import NewsSection from "./Components/news";
import ScrollToTopButton from './Components/scroll';
// import FirstTimeAd from './Components/FirstTimeAd';

interface PageComponent {
  component: ReactElement;
  priority?: boolean;
}

export default function Home() {
  // Organized components in order of appearance
  const pageComponents: PageComponent[] = [
    // { component: <TopBar key="topbar" /> },
    { component: <Navbar key="navbar" /> },
    // { component: <Hero key="hero" />, priority: true },
    { component: <Overview key="overview" /> },
        { component: <NewsSection key="news" /> },
    { component: <Products key="products" /> },
    { component: <Banner key="banner" /> },
    { component: <ScrollToTopButton key="scroll" /> },
    { component: <Footer key="footer" /> },
    // { component: <FirstTimeAd key="ad" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {pageComponents.map(({ component }) => component)}
    </div>
  );
}