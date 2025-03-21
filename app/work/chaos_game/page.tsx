'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'

const Kick = dynamic(() => import('./chaos_game'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function ChaosGame() {
  return (
    <main>
      <section className={styles.artwork}>
        <h2>Chaos Game</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link href="https://gin-graphic.hatenablog.com/entry/2023/12/20/060000" target="_blank">
                ギンの備忘録
              </Link>
            </li>
          </ul>
        </div>

        <Pagination currentID={0} />
      </section>
    </main>
  );
}
