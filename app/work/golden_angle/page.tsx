'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./golden_angle'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function GoldenAngle() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Golden Angle</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentID={5} />
      </section>
    </main>
  );
}
