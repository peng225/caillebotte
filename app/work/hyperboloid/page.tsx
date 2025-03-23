'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from 'next/dynamic'
import { useEffect } from "react";

const Kick = dynamic(() => import('./hyperboloid'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Hyperboloid() {
  const workTitle = "Hyperboloid"
  useEffect(() => {
    document.title = workTitle;
  }, []);
  return (
    <main>
      <section className={styles.artwork}>
        <h2>{workTitle}</h2>
        <p>This work is ...</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentID={2} />
      </section>
    </main>
  );
}
