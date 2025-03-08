'use client';

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./prime_spiral'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Hyperboloid() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Prime Spiral</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.navigationButtons}>
          <Link href={"/work/hyperboloid"} className={styles.button}>Prev</Link>
          <Link href={"/"} className={styles.button}>Top</Link>
        </div>
      </section>
    </main>
  );
}
