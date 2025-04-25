import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png";

export default function WelcomePage() {
  const { scrollYProgress } = useScroll();

  // Using scrollYProgress instead of scrollY for better responsive behavior
  const yCity = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacityCity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.6],
    [1, 0.8, 0.5, 0]
  );

  const yHero = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacityHero = useTransform(
    scrollYProgress,
    [0, 0.45, 0.6],
    [1, 0.8, 0]
  );

  const yText = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.6],
    [0, 30, 60, 200]
  );
  const scaleText = useTransform(scrollYProgress, [0, 0.45], [1, 1.3]);

  return (
    <>
      <header id="welcome-header">
        <motion.img
          style={{
            opacity: opacityCity,
            y: yCity
          }}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          id="welcome-header-content"
          style={{
            scale: scaleText,
            y: yText
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        <motion.img
          style={{
            y: yHero,
            opacity: opacityHero
          }}
          src={heroImg}
          alt="A superhero wearing a cape"
          id="hero-image"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            "I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!" - Alex
            P.
          </p>
        </section>
      </main>
    </>
  );
}
