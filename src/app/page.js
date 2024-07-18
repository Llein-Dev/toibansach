
import ContactComponent from "./components/contact";
import CustomerComponent from "./components/customer";
import SliderComponent from "./components/slider";


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
