'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./koch_curve'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function KochCurve() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Koch Curve</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentID={6} />
      </section>
    </main>
  );
}
