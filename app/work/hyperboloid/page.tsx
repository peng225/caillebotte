'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./hyperboloid'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Hyperboloid() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Hyperboloid</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentID={2} />
      </section>
    </main>
  );
}
