import React from "react";
import BizHeader from "@/component/biz/bizHeader";
import BizPrototype from "@/component/biz/bizPrototype";
import BizGrowth from "@/component/biz/businessGrowth";
import BizHistory from "@/component/biz/businessHistory";
import BizVisionSection from "@/component/biz/businessVisionSection";
import BizSphere from "@/component/biz/bizShpere";
import BizToolbox from "@/component/biz/bizToolbox";

const BizPage = () => {
  return (
    <div>
      <BizHeader />
      <BizPrototype />
      <BizGrowth />
      <BizHistory />
      <BizVisionSection />
      <BizSphere />
      <BizToolbox />
    </div>
  );
};

export default BizPage;
