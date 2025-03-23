"use client";

import Pagination from "../pagination";

import styles from "../page.module.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const workTitle = "Golden Angle";
const workTitleInSnakeCase = workTitle.toLowerCase().replace(" ", "_");

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
        <p>
          By rotating the leaves of the plants by golden angles as they are placed, those leaves
          will be able to receive more sunlight.
        </p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
