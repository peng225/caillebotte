import Image from "next/image";
import Link from 'next/link';
import styles from "./page.module.css";

import thumb_chaos_game from '../public/images/chaos_game.png'
import thumb_stereogram from '../public/images/stereogram.png'
import thumb_hyperboloid from '../public/images/hyperboloid.png'
import thumb_prime_spiral from '../public/images/prime_spiral.png'
import thumb_voronoi_diagram from '../public/images/voronoi_diagram.png'
import thumb_golden_angle from '../public/images/golden_angle.png'

export default function Home() {
  return (
    <main>
      <section className={styles.hero} style={{
        background: `url(${thumb_chaos_game.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}>
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
              <Image src={thumb_chaos_game} alt="Chaos Game" />
              <p>Chaos Game</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/stereogram"}>
              <Image src={thumb_stereogram} alt="Stereogram" />
              <p>Stereogram</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/hyperboloid"}>
              <Image src={thumb_hyperboloid} alt="Hyperboloid" />
              <p>Hyperboloid</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/prime_spiral"}>
              <Image src={thumb_prime_spiral} alt="Prime Spiral" />
              <p>Prime Spiral</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/voronoi_diagram"}>
              <Image src={thumb_voronoi_diagram} alt="Voronoi Diagram" />
              <p>Voronoi Diagram</p>
            </Link>
          </div>
          <div className={styles.artCard}>
            <Link href={"/work/golden_angle"}>
              <Image src={thumb_golden_angle} alt="Golden Angle" />
              <p>Golden Angle</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
