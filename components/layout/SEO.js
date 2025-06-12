import Head from "next/head";
const SEO = (props) => {
  return (
    <Head>
      <title>{props?.title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="content-language" content="en-us" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="manifest" href="/manifest.json" />
      <link href="/favicon.ico" rel="icon" type="image/png" sizes="16x16" />
      <link href="/favicon.ico" rel="icon" type="image/png" sizes="32x32" />
      <link href="/favicon.ico" rel="icon" type="image/png" sizes="96x96" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <meta name="description" content={props?.desc ? props?.desc : ""} />
      <meta property="og:type" content="website" />
      <meta
        name={`og:${props?.title}`}
        property="og:title"
        content={props?.title}
      />

      <meta
        name="og:description"
        property="og:description"
        content={props.desc ? props?.desc : ""}
      />
      {/* site name */}
      <meta property="og:site_name" content="" />
      <meta property="og:url" content={props?.pageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta
        name="twitter:description"
        content={props?.desc ? props?.desc : ""}
      />
      <meta name="twitter:site" content={props?.pageUrl} />
      <meta name="twitter:creator" content={props?.title} />
      <link rel="apple-touch-icon" href="favicon.ico" />
      <meta property="og:image" content={props?.ogImage} />
      <meta name="twitter:image" content="" />
      <link rel="canonical" href={props?.pageUrl} />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
};
export default SEO;
