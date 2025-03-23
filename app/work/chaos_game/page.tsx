"use client";

import Pagination from "../pagination";

import styles from "../page.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const workTitle = "Chaos Game";
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
        <p>Countless random selections produce fractals.</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link
                href="https://gin-graphic.hatenablog.com/entry/2023/12/20/060000"
                target="_blank"
              >
                ギンの備忘録
              </Link>
            </li>
          </ul>
        </div>

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
