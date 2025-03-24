"use client";

import Pagination from "../pagination";

import styles from "../page.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const workTitle = "Sampling Theorem";
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
        <p>Excessively fast rotation causes a false movement.</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link href="https://www.silhouette-illust.com/illust/37094" target="_blank">
                SILHOUETTE ILLUST
              </Link>
            </li>
          </ul>
        </div>

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
