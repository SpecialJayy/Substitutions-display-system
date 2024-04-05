import Link from "next/link";

export default function Home() {
  return (
      <div>
        <Link href={"/display"}>Display</Link>
        <br/>
        <Link href={"/upload"}>Upload</Link>
        <br/>
        <Link href={"/api"}>Api</Link>
      </div>
  );
}
