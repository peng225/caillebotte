import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import thumbChaosGame from "../public/images/chaos_game.png";
import thumbStereogram from "../public/images/stereogram.png";
import thumbHyperboloid from "../public/images/hyperboloid.png";
import thumbPrimeSpiral from "../public/images/prime_spiral.png";
import thumbVoronoiDiagram from "../public/images/voronoi_diagram.png";
import thumbGoldenAngle from "../public/images/golden_angle.png";
import thumbKochCurve from "../public/images/koch_curve.png";
import thumbSamplingTheorem from "../public/images/sampling_theorem.png";

export default function Home() {
  return (
    <main>
      <section
        className={styles.hero}
        style={{
          background: `url(${thumbChaosGame.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.overlay}>
          <h2>Welcome to the world of mathematical art</h2>
          <p>Enjoy the harmony of mathematics, computers, and art.</p>
        </div>
      </section>
      <section className={styles.workList}>
        <h2>Works</h2>
        <div className={styles.artLink}>
          <div className={styles.artCard}>
            <Link href={"/work/chaos_game"}>
              <Image src={thumbChaosGame} alt="Chaos Game" />
              <p>Chaos Game</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/stereogram"}>
              <Image src={thumbStereogram} alt="Stereogram" />
              <p>Stereogram</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/hyperboloid"}>
              <Image src={thumbHyperboloid} alt="Hyperboloid" />
              <p>Hyperboloid</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/prime_spiral"}>
              <Image src={thumbPrimeSpiral} alt="Prime Spiral" />
              <p>Prime Spiral</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/voronoi_diagram"}>
              <Image src={thumbVoronoiDiagram} alt="Voronoi Diagram" />
              <p>Voronoi Diagram</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/golden_angle"}>
              <Image src={thumbGoldenAngle} alt="Golden Angle" />
              <p>Golden Angle</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/koch_curve"}>
              <Image src={thumbKochCurve} alt="Koch Curve" />
              <p>Koch Curve</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/sampling_theorem"}>
              <Image src={thumbSamplingTheorem} alt="Sampling Theorem" />
              <p>Sampling Theorem</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
