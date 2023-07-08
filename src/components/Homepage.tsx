import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Grid from "./Layout/Grid";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ src, text }: { src: string; text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img width={300} height={300} src={src} alt="A London skyscraper" />
      </div>
      <motion.h2 className="text-4xl " style={{ y }}>
        {text}
      </motion.h2>
    </section>
  );
}

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const imagesAndTexts = [
    { src: "/images/scene.jpeg", text: "Text 1" },
    { src: "/images/scene2.jpeg", text: "Text 2" },
    { src: "/images/scene2.jpeg", text: "Text 3" },
    { src: "/images/scene.jpeg", text: "Text 4" },
    { src: "/images/scene.jpeg", text: "Text 5" },
  ];

  return (
    <>
      <Grid>
        <h1 className="knockout bg-primary col-start-3 col-span-5 font-bold text-primary text-wrap">
          PITSTOP PROTOCOL
        </h1>
      </Grid>
      <section className="pt-60 flex flex-col justify-center align-center">
        {imagesAndTexts.map((item, index) => (
          <Image key={index} src={item.src} text={item.text} />
        ))}
        <motion.div className="progress bg-accent" style={{ scaleX }} />
      </section>
    </>
  );
};

export default Home;
