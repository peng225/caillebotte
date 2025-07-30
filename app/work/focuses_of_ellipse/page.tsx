"use client";

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const workTitle = "Focuses of Ellipse";
const workTitleInSnakeCase = workTitle.toLowerCase().replaceAll(" ", "_");

const Kick = dynamic(() => import("./" + workTitleInSnakeCase), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Work() {
  useEffect(() => {
    document.title = workTitle;
  }, []);
  return (
    <main>
      <section className={styles.artwork}>
        <h2>{workTitle}</h2>
        <p>Particles come and go between two focal points of the ellipse.</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
