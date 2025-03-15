import styles from "./page.module.css";
import Link from 'next/link';

interface Props {
    currentID: number;
}

const pageNames = new Array<string>(
    "chaos_game",
    "stereogram",
    "hyperboloid",
    "prime_spiral",
    "voronoi_diagram",
    "golden_angle",
)

export default function Pagination(props: Props) {
    const maxPageCount = pageNames.length
    // Use set for deduplication.
    const shownIDSet = new Set<number>([0, maxPageCount - 1])
    let prevID, nextID: number
    if (props.currentID === 0) {
        prevID = 0
        nextID = 1
        shownIDSet.add(1)
        shownIDSet.add(2)
    } else if (props.currentID === maxPageCount - 1) {
        prevID = maxPageCount - 2
        nextID = maxPageCount - 1
        shownIDSet.add(maxPageCount - 3)
        shownIDSet.add(maxPageCount - 2)
    } else {
        prevID = props.currentID - 1
        nextID = props.currentID + 1
        shownIDSet.add(props.currentID - 1)
        shownIDSet.add(props.currentID)
        shownIDSet.add(props.currentID + 1)
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
                        if (id == props.currentID) {
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
