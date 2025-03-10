'use client';

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./voronoi_diagram'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function VoronoiDiagram() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Voronoi Diagram</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link href="https://chatgpt.com/share/67cd2847-1c7c-8002-9f15-ae5292b74604" target="_blank">
                ChatGPT
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navigationButtons}>
          <Link href={"/work/prime_spiral"} className={styles.button}>Prev</Link>
          <Link href={"/"} className={styles.button}>Top</Link>
        </div>
      </section>
    </main>
  );
}
