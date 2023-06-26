import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link className="inline-block border rounded-md py-2 px-3" href={'/'}>Home</Link>
            <Link className="inline-block border rounded-md py-2 px-3" href={'/countries'}>Countries</Link>
        </div>
    )
}

