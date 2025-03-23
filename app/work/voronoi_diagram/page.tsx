'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useEffect } from "react";

const workTitle = "Voronoi Diagram"
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
        <p>By tapping the canvas repeatedly, beautiful rainbow-colored patterns will appear.</p>

        <div id={styles.artworkCanvas}></div>
        <Kick />

        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            <li>
              <Link href="https://chatgpt.com/share/67cd2847-1c7c-8002-9f15-ae5292b74604" target="_blank">
                ChatGPT
              </Link>
            </li>
          </ul>
        </div>

        <Pagination currentPage={workTitleInSnakeCase} />
      </section>
    </main>
  );
}
