'use client';

import * as work from "./chaos_game.js"
import Load from "../p5_loader"

import styles from "../page.module.css";
import Link from 'next/link';

export default function ChaosGame() {
  return (
    <main>
      <Load f={() => { work.spawn() }} />
      <section className={styles.artwork}>
        <h2>Chaos Game</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>

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

        <div className={styles.navigationButtons}>
          <Link href={"/"} className={styles.button}>Top</Link>
          <Link href={"/work/stereogram"} className={styles.button}>Next</Link>
        </div>
      </section>
    </main>
  );
}
