import { NextResponse } from "next/server";
import path from "path";
import {promises as fs} from "fs";

export async function GET() {
    try {
        const file = await fs.readFile(process.cwd() + '/public/assets/raw.html', 'utf8');

        const date = file.split('Okres: ')[1].substring(0, 10);

        const decoded: string[][] = [];
        const table = file.split('table')[4].split('\n').slice(6, -1).filter((_, index) => index % 2 === 0);
        let i = 0
        table.forEach(row => {
            const res: string[] = row.replace(/\t|<td>|<\/td>|\r/g, '@').split('@').filter(Boolean);
            res.unshift(date)
            res.unshift(i.toString())
            i++
            decoded.push(res);
        })

        console.log(decoded)

        return new Response(JSON.stringify(decoded), {
            headers: { "content-type": "application/json" },
            status: 200,
        })
    } catch (error) {
        console.log(error)
    }

}

export async function POST(req: any) {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received.", status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename =  "raw.html";
    console.log(file.name);
    try {
        await fs.writeFile(
            path.join(process.cwd(), "public/assets/" + filename),
            buffer
        );
        return NextResponse.json({ message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Failed", status: 500 });
    }
}