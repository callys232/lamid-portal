import Humancapitaldev from "../../component/hcd/hcdHeader";
import HcdEvents from "../../component/hcd/hcdEvent";
import HcdTrainers from "../../component/hcd/hcdTrainer";
import BizPrototypes from "../../component/bizPrototypes/bizPrototypes";
import BusinessTraining from "../../component/bizPrototypes/businessTraining";
import Testimonial from "../../component/Testimonial";
import Slider from "../../component/slider";

const HumancapitaldevPage = () => {
  return (
    <div>
      <Humancapitaldev />
      <HcdEvents />
      <HcdTrainers />
      <BizPrototypes />
      <BusinessTraining />
      <Testimonial />
      <Slider />
    </div>
  );
};
export default HumancapitaldevPage;
