'use client';

import Pagination from "../pagination";

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

        <Pagination currentID={1} />
      </section>
    </main>
  );
}
