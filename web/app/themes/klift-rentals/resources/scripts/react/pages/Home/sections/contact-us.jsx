export default function ContactUs(props) {
  return (
    <section
      className="contact-us-banner"
      style={{
        background: `url(${props.data?.background_image})`,
      }}
    >
      <div className="contact-us-content bg-primary bg-opacity-80 rounded-4">
        <div className="contact-us-content-data">
          <h3 className="text-center text-white h3">{props.data?.title}</h3>
          <p className="text-center text-white p1">{props.data?.description}</p>
        </div>
      </div>
    </section>
  );
}
