'use client';

import Pagination from "../pagination";

import styles from "../page.module.css";
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useEffect } from "react";

const Kick = dynamic(() => import('./voronoi_diagram'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function VoronoiDiagram() {
  const workTitle = "Voronoi Diagram"
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

        <Pagination currentID={4} />
      </section>
    </main>
  );
}
