'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from 'next/dynamic'
import { useEffect } from "react";

const workTitle = "Hyperboloid"
const workTitleInSnakeCase = workTitle.toLowerCase().replace(" ", "_")

const Kick = dynamic(() => import('./' + workTitleInSnakeCase), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Work() {
  useEffect(() => {
    document.title = workTitle;
  }, []);
  return (
    <main>
      <section className={styles.artwork}>
        <h2>{workTitle}</h2>
        <p>A set of lines forms a beautiful curved surface.</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
