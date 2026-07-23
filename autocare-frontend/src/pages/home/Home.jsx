import Hero from "../../components/home/Hero";
import ServicesSection from "../../components/home/ServicesSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import StatsSection from "../../components/home/StatsSection";
import Testimonials from "../../components/home/Testimonials";
import CallToAction from "../../components/home/CallToAction";

function Home() {

    return (

        <>
            <Hero />
            <ServicesSection />
            <WhyChooseUs />
            <StatsSection />
            <Testimonials />
            <CallToAction />
        </>

    );

}

export default Home;