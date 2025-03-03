'use client';

import * as work from "./hyperboloid.js"
import Load from "../p5_loader"

import styles from "../page.module.css";
import Link from 'next/link';

export default function Hyperboloid() {
  return (
    <main>
      <Load f={() => { work.spawn() }} />
      <section className={styles.artwork}>
        <h2>Hyperboloid</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>

        <div className={styles.navigationButtons}>
          <Link href={"/work/stereogram"} className={styles.button}>Prev</Link>
          <Link href={"/"} className={styles.button}>Top</Link>
          <Link href={"/work/prime_spiral"} className={styles.button}>Next</Link>
        </div>
      </section>
    </main>
  );
}
