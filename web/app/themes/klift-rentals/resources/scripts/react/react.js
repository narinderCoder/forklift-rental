import ReactDOM from "react-dom/client";
// import Header from "./Components/HelloWorld";
// import Footer from "./Components/Footer";
// import HomeSlider from "./Components/Pages/Homepage/HomeSlider";
// import CatagorySection from "./Components/Pages/Homepage/CatagorySection";
// import HomeBenefitList from "./Components/Pages/Homepage/homeBenefitList";
// import WhyChooseUs from "./Components/Pages/Homepage/WhyChooseUs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import HeaderContent from "./components/HeaderContent";
import ForkliftsForSale from "./pages/for-sale/ForkliftsForSale";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Blog from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import IndustrySolutions from "./pages/IndustrySolutions";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ForkliftsEngines from "./pages/ForkliftsEngines";
import NewForkliftsForSale from "./pages/NewForkliftsForSale";
import NewForkliftsForSaleDetails from "./pages/NewForkliftsForSaleDetails";
import SingleProduct from "./pages/SingleProduct";
import CartTotal from "./components/CartTotal";
import { CartProvider } from "./components/CartProvider";
import CHLForkliftDealer from "./pages/CHLForkliftDealer";
import ElectricPalletJack from "./pages/ElectricPalletJack";
import SkidSteerRentals from "./pages/SkidSteerRentals";


const renderComponent = (element, Component) => {
    if (element) {
      ReactDOM.createRoot(element).render(
        <CartProvider>
          <Component />
        </CartProvider>
      );
    }
  };

// const helloWorldComponent = document.getElementById('reactApp');
// if (helloWorldComponent) {
//     ReactDOM.createRoot(helloWorldComponent).render(
//         <Header />
//     );
// }

//Homepage

// const homeSlider = document.getElementById('homeSlider');
// if (homeSlider) {
//     ReactDOM.createRoot(homeSlider).render(
//         <HomeSlider />
//     );
// }

const hw = document.getElementById('footerApp');
if (hw) {
    ReactDOM.createRoot(hw).render(
        <Footer />
    );
}

// const cs = document.getElementById('CatagorySection');
// if (cs) {
//     ReactDOM.createRoot(cs).render(
//         <CatagorySection />
//     );
// }

// const homeBenefitListDiv = document.getElementById('homeBenefitList');
// if (homeBenefitListDiv) {
//     ReactDOM.createRoot(homeBenefitListDiv).render(
//         <HomeBenefitList/>
//     );
// }

// const whyChooseUs = document.getElementById('whyChooseUs');
// if (whyChooseUs) {
//     ReactDOM.createRoot(whyChooseUs).render(
//         <WhyChooseUs/>
//     );
// }

const getHeaderReact = document.getElementById('getHeaderReact');
if (getHeaderReact) {
    ReactDOM.createRoot(getHeaderReact).render(
        <HeaderContent />
    );
}

const homePage = document.getElementById('homePageReact');
if (homePage) {
    ReactDOM.createRoot(homePage).render(
        <Home/>
    );
}

const saleProduct = document.getElementById('saleProductReact');
if (saleProduct) {
    ReactDOM.createRoot(saleProduct).render(
        <ForkliftsForSale/>
    );
}

const rentProduct = document.getElementById('rentProductReact');
if (rentProduct) {
    ReactDOM.createRoot(rentProduct).render(
        <Products/>
    );
}


const blogPage = document.getElementById('blogPageReact');
if (blogPage) {
    ReactDOM.createRoot(blogPage).render(
        <Blog/>
    );
}


const blogDetail = document.getElementById('blogDetailReact');
if (blogDetail) {
    ReactDOM.createRoot(blogDetail).render(
        <SingleBlog/>
    );
}

const IndustrySolutionsReact = document.getElementById('IndustrySolutionsReact');
if (IndustrySolutionsReact) {
    ReactDOM.createRoot(IndustrySolutionsReact).render(
        <IndustrySolutions/>
    );
}


const aboutPageReact = document.getElementById('aboutPageReactApp');
if (aboutPageReact) {
    ReactDOM.createRoot(aboutPageReact).render(
        <AboutUs/>
    );
}



const contactPageReact = document.getElementById('contactPageReactApp');
if (contactPageReact) {
    ReactDOM.createRoot(contactPageReact).render(
        <ContactUs/>
    );
}

const engineListing = document.getElementById('engineListingApp');
if (engineListing) {
    ReactDOM.createRoot(engineListing).render(
        <ForkliftsEngines/>
    );
}

const newForklist = document.getElementById('newForkliftsListingApp');
if (newForklist) {
    ReactDOM.createRoot(newForklist).render(
        <NewForkliftsForSale/>
    );
}

const newForklistDetail = document.getElementById('NewForkLiftsDetailPage');
if (newForklistDetail) {
    ReactDOM.createRoot(newForklistDetail).render(
        <NewForkliftsForSaleDetails/>
    );
}

const registerPageReactDiv = document.getElementById('registerPageReact');
if (registerPageReactDiv) {
    ReactDOM.createRoot(registerPageReactDiv).render(
        <NewForkliftsForSaleDetails/>
    );
}

const PackingPallet = document.getElementById('PackingPallet');
if (PackingPallet) {
    ReactDOM.createRoot(PackingPallet).render(
        <ElectricPalletJack />
    );
}

const skidSteers = document.getElementById('skidSteers');
if (skidSteers) {
    ReactDOM.createRoot(skidSteers).render(
        <SkidSteerRentals />
    );
}



const chlForkliftDealer = document.getElementById('chlForkliftDealerProduct');
if (chlForkliftDealer) {
    ReactDOM.createRoot(chlForkliftDealer).render(
        <CHLForkliftDealer/>
    );
}

const rentalDetailsPage = document.getElementById('RentalDetailPage');
if (rentalDetailsPage) { 
    renderComponent(rentalDetailsPage,SingleProduct);
}

const cartTotals = document.getElementById('getCartTotals');
if (cartTotals) {
    renderComponent(cartTotals,CartTotal);
} 