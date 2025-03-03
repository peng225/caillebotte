'use client';

import * as work from "./prime_spiral.js"
import Load from "../p5_loader"

import styles from "../page.module.css";
import Link from 'next/link';

export default function Hyperboloid() {
  return (
    <main>
      <Load f={() => { work.spawn() }} />
      <section className={styles.artwork}>
        <h2>Prime Spiral</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>

        <div className={styles.navigationButtons}>
          <Link href={"/work/hyperboloid"} className={styles.button}>Prev</Link>
          <Link href={"/"} className={styles.button}>Top</Link>
        </div>
      </section>
    </main>
  );
}
