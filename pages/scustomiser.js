import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/secondCustomiser"), {
  ssr: false,
});

const SCustomiser = () => {
  return (
    <section>
      <Canvas />
    </section>
  );
};

export default SCustomiser;
