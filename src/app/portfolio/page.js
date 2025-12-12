import React from "react";
import Header from "@/component/portfolio/headerPort";
import Vmo from "@/component/VMO";
import Section from "@/component/portfolio/section";
import PlegeandStrategy from "@/component/portfolio/plegeandStrategy";
import AboutUs from "@/component/AboutUs";
import Value from "@/component/portfolio/values";
import Slider from "@/component/slider";
import ContactUs from "@/component/contactUs";

const portfolioPage = () => {
  return (
    <div>
      <Header />
      <AboutUs />
      <Value />
      <Slider />
      <Vmo />
      <Section />
      <PlegeandStrategy />
      <ContactUs />
    </div>
  );
};

export default portfolioPage;
