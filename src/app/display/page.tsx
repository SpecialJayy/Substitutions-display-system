"use client"

import {useEffect, useState} from "react";

export default function Display() {
    const [subs, setSubs] = useState([])

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setSubs(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <div>
            <h1>Zastępstwa</h1>
            {subs.length !== 0 && <h2>{subs[0][1]}</h2>}
            <table>
            <thead>
                <tr>
                    <th>Lekcja</th>
                    <th>Klasa</th>
                    <th>Zastępca</th>
                    <th>Przedmiot</th>
                    <th>Sala</th>
                </tr>
                </thead>
                <tbody>
                {subs.length !== 0 && subs.map((elem) => (
                    <tr key={elem[0]}>
                        <td>{elem[1]}</td>
                        <td>{elem[4]}</td>
                        <td>{elem[7]}</td>
                        <td>{elem[5]}</td>
                        <td>{elem[6]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}