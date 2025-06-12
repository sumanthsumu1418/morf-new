import Link from "next/link";
const Groomsmen = () => {
  // Dummy data
  const coverImage = "/images/groomsmen_cover.jpg";
  const title = "Groomsmen Collection";
  const description =
    "Celebrate your big day with our exclusive groomsmen collection. Perfect for every style.";
  return (
    <section className="fourthSecc container">
      <div className="fourthSecc_content">
        <div className="fourthSecc_content_top">
          <img src={coverImage} alt="Groomsmen Cover" />
        </div>

        <div className="fourthSecc_content_bottom">
          <h2 className="fourthSecc_content_bottom_title">{title}</h2>
          <p className="fourthSecc_content_bottom_desc">{description}</p>
          <Link href="/contact" passHref>
            <a className={`common-btn-style getInTouch`}>
              <span>Get In Touch</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Groomsmen;
