import styles from "./page.module.css";
import Link from 'next/link';

interface Props {
    currentPage: string;
}

const pageNames = new Array<string>(
    "chaos_game",
    "stereogram",
    "hyperboloid",
    "prime_spiral",
    "voronoi_diagram",
    "golden_angle",
    "koch_curve",
)

const pageNameToID = function (): Map<string, number> {
    const ret = new Map<string, number>()
    for (const [i, v] of pageNames.entries()) {
        ret.set(v, i)
    }
    return ret
}()

export default function Pagination(props: Props) {
    const maxPageCount = pageNames.length
    // Use set for deduplication.
    const shownIDSet = new Set<number>([0, maxPageCount - 1])
    let prevID, nextID: number
    const currentID = pageNameToID.get(props.currentPage)
    if (currentID === undefined) {
        console.log("Failed to get the page ID.")
        return (<></>)
    }
    if (currentID === 0) {
        prevID = 0
        nextID = 1
        shownIDSet.add(1)
        shownIDSet.add(2)
    } else if (currentID === maxPageCount - 1) {
        prevID = maxPageCount - 2
        nextID = maxPageCount - 1
        shownIDSet.add(maxPageCount - 3)
        shownIDSet.add(maxPageCount - 2)
    } else {
        prevID = currentID - 1
        nextID = currentID + 1
        shownIDSet.add(currentID - 1)
        shownIDSet.add(currentID)
        shownIDSet.add(currentID + 1)
    }
    const shownIDs = Array.from(shownIDSet)
    shownIDs.sort()
    return (
        <nav className={styles.pagination}>
            {
                (function () {
                    const navItems = [];
                    navItems.push(<li key={"prevArrow"}><Link href={pageNames[prevID]}>{"<"}</Link></li>);
                    for (let i = 0; i < shownIDs.length; i++) {
                        const id = shownIDs[i]
                        if (i != 0 && id - shownIDs[i - 1] > 1) {
                            navItems.push(<li key={"dotsBefore" + id.toString()} className={styles.dots}>...</li>);
                        }
                        if (id === currentID) {
                            navItems.push(<li key={"pageID" + id.toString()}><Link href={pageNames[id]} className={styles.focused}>{(id + 1).toString()}</Link></li>);
                        } else {
                            navItems.push(<li key={"pageID" + id.toString()}><Link href={pageNames[id]}>{(id + 1).toString()}</Link></li>);
                        }
                    }
                    navItems.push(<li key={"nextArrow"}><Link href={pageNames[nextID]}>{">"}</Link></li>);
                    return <ul>{navItems}</ul>;
                }())
            }
        </nav>
    );
}
