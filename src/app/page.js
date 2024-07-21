
import ContactComponent from "./components/Section/contact";
import CustomerComponent from "./components/Section/customer";
import SliderComponent from "./components/header/slider";


export default function Home() {
  return (
    <div className="hero_area">
      {/* Slider Section */}
      <SliderComponent />
      {/* customer section */}
      <CustomerComponent />
      {/* contact section */}
      <ContactComponent />
    </div>
  );
}
