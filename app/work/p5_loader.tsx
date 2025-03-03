
import Script from 'next/script';

interface Props {
    f: () => void;
}

export default function Load(props: Props) {
    return (
        <Script
            src="https://cdn.jsdelivr.net/npm/p5@1.11.3/lib/p5.min.js"
            onReady={props.f}
        />
    );
}
