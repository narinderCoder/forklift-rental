import ProductSlider from "../../components/product-slider";
import PrinterIcon from "../../icons/printer";
import Quote from "../../icons/quote";
import Trade from "../../icons/trade";
import Finance from "../../icons/finance";
import Message from "../../icons/message";
import ShareIcon from "../../icons/share";
import QuoteForm from "../../components/quote-form";
import Share from "../../components/share";
import ExpandableCard from "../../components/expandable-card";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const product = {
  title: "LA Houston",
  images: [
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
  ],
};

const CHLForkliftDealer = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="container mx-auto section-alt px-4">
      <h3 className="h3 mb-4">2024 CHL CPYD25</h3>
      <p className="p1" style={{ marginBottom: "2.5rem" }}>
        {`2024 CHL 2-3.5t K2C series IC CPYD25 Forklift Improved performance,
        superior quality Features may include: Vibration 20% reduced Workspace
        45% increased Operator’s view 20% improved`}
      </p>
      <div className="row mb-custom">
        <div className="col-lg-5 col-md-6 col-12 mb-custom">
          <ProductSlider data={product} className="mb-custom col-12 w-100" />
          <iframe
            src="https://www.youtube.com/embed/xD9CYjql0Pk"
            className="col-12 rounded-4"
            style={{ height: "25rem" }}
          />
        </div>
        <div className="col-lg-7 col-md-6 col-12">
          <h5 className="h5 text-end">Click for quote!</h5>
          <h6 className="h6" style={{ marginBottom: "1.75rem" }}>
            Selling Price
          </h6>
          <div
            className="d-flex flex-column align-items-start w-100"
            style={{ gap: "1.5rem", marginBottom: "1.5rem" }}
          >
            <DealershipButton
              icon={Quote}
              title="Get a quote"
              onClick={() => setShowQuote(!showQuote)}
            />
            <DealershipButton icon={Trade} title="Value your trade" />
            <DealershipButton icon={Finance} title="Get Financing " />
            <DealershipButton icon={Message} title="Contact Us" />
            <DealershipButton icon={PrinterIcon} title="Print" />
            <DealershipButton
              icon={ShareIcon}
              title="Share"
              onClick={() => setShowShare(!showShare)}
            />
          </div>
          <div className="d-flex flex-column" style={{ gap: "1.5rem" }}>
            <ExpandableCard title="Info" data={[]} />
            <ExpandableCard title="Specification" data={[]} />
          </div>
        </div>
      </div>
      <div className="">
        <h3
          className="h3"
          style={{ marginBottom: "2.5rem", overflow: "hidden" }}
        >
          Recommendations
        </h3>
        <div className="row g-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="p-2">
                <img
                  src={
                    "https://www.heliforkliftamerica.com/uploadfiles/2020/03/20200302134934015.jpg"
                  }
                  alt="alt"
                  className="w-100 h-auto"
                />
                <p className="p1">2024</p>
                <h6 className="h6">CHL CPYD25C-KU1HC</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="p1" style={{ marginTop: "2.5rem" }}>
        Advertised pricing excludes applicable taxes title and licensing and are
        subject to change without notice. Pricing may exclude any added parts,
        accessories or installation unless otherwise noted. Sale prices include
        all applicable offers. Not all options listed available on pre-owned
        models. Contact dealer for details.
      </p>
      {<QuoteForm show={showQuote} setShow={setShowQuote} />}
      {<Share show={showShare} setShow={setShowShare} />}
    </div>
  );
};

const DealershipButton = ({ icon, title, onClick }) => {
  const Icon = icon;
  return (
    <button
      className="justify-content-between align-items-center d-flex w-100 gap-2 text-opacity-50 btn-secondary p1 hover-text-primary"
      onClick={onClick}
    >
      <div className="d-flex align-items-center gap-2">
        <Icon />
        <p>{title}</p>
      </div>
      <ChevronRight />
    </button>
  );
};

export default CHLForkliftDealer;
