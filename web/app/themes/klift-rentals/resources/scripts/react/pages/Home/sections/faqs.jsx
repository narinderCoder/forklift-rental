import FaqsSection from "../../../components/faqs-section";

export default function Faqs(props) {
  return (
    <section className="container m-auto section-alt px-2">
      <h3 className="text-center h3" style={{ marginBottom: "2.5rem" }}>
        Frequently Asked Questions
      </h3>
      <FaqsSection faqs={props.data?.faqs_item} />
    </section>
  );
}
