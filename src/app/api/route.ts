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
            res[2] = res[2].replace(',', ' |')
            if (res.length == 7) {
                res.splice(6, 0, '')
            }
            i++
            decoded.push(res);
        })

        const groups: string[][][] = [];

        let absent: string[] = [];

        decoded.forEach(row => {
            absent.push(row[3]);
        })

        absent = Array.from(new Set(absent));
        absent = absent.sort();

        absent.forEach(teacher => {
            const temp: string[][] = [];
            decoded.forEach(sub => {
                if (teacher === sub[3]) {
                    temp.push(sub);
                }
            })
            if (temp.length > 10) {
                for (let i = 0; i < temp.length; i += 10) {
                    groups.push(temp.slice(i, i + 10));
                }
            } else {
                groups.push(temp);
            }
        })


        const toReturn = {absent, groups};

        return new Response(JSON.stringify(toReturn), {
            headers: { "content-type": "application/json" },
            status: 200,
        })
    } catch (error) {
        console.error(error)
    }

}

export async function POST(req: any) {
    const formData = await req.formData();
    const filename =  "raw.html";
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (formData.has("file")) {
        const file = formData.get("file");
        if (!file) {
            return NextResponse.json({ error: "No files received.", status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        try {
            await fs.writeFile(
                path.join(process.cwd(), "public/assets/" + filename),
                buffer
            );
            return NextResponse.json({ message: "File successfully added", status: 201 });
        } catch (error) {
            console.error("Error occured ", error);
            return NextResponse.json({ message: "Failed", status: 500 });
        }
    } else if (formData.has("delete")) {
        try {
            await fs.writeFile(
                path.join(process.cwd(), "public/assets/" + filename),
                ''
            );
            return NextResponse.json({ message: "File successfully deleted", status: 201 });
        } catch (error) {
            console.error("Error occured ", error);
            return NextResponse.json({ message: "Failed", status: 500 });
        }
    }

}