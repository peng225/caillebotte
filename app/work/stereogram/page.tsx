'use client';

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./stereogram'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Stereogram() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Stereogram</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link href="https://www.mathartroom.com/stereogram/randomdot_stereogram/" target="_blank">
                数学アートの部屋
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navigationButtons}>
          <Link href={"/work/chaos_game"} className={styles.button}>Prev</Link>
          <Link href={"/"} className={styles.button}>Top</Link>
          <Link href={"/work/hyperboloid"} className={styles.button}>Next</Link>
        </div>
      </section>
    </main>
  );
}
