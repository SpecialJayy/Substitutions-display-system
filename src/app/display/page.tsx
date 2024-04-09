"use client"

import {useEffect, useState} from "react";
import Image from "next/image"

export default function Display() {
    const [subs, setSubs] = useState([])

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setSubs(data))
            .catch(err => console.error(err))
    }, []);



    return (
        <div className="body">
             <div className="backGround">
                <div className="transparency"></div>
            </div>
            <div className="foreGround">
                <Image
                    src={`/images/zespol_szkol_logo.png`}
                    alt="Logo Szkoły"
                    width={100}
                    height={100}
                    className="schoolLogo"
                />
                <h1 className="header"><span className="headerText">Zastępstwa</span></h1>
                {/* {subs.length !== 0 && <h2>{subs[0][1]}</h2>} */}
                <div className={`${ subs.length == 0 ? "" : "hidden"}`}>
                    ni mo zastępstw
                </div>
                <div className={`main ${ subs.length == 0 ? "hidden" : ""}`}>
                    <span>
                    <p className="calendarTime">
                        <Image 
                            src={`/images/calendar.png`}
                            height={100}
                            width={100}
                            alt="kalendarz"
                            className="tableIcon"/>
                        {/* {subs[0][1] &&
                        <span>{subs[0][1]}</span>
                        } */}
                    </p>
                    <div className="rounded">
                        <table className="mainTable">
                    <thead>
                        <tr>
                            <th> 
                                <p className="tableInfo">
                                    <Image 
                                    src={`/images/clock.png`}
                                    height={100}
                                    width={100}
                                    alt="zegar"
                                    className="tableIcon"/>
                                    Lekcja
                                </p>
                            </th>
                            <th>
                                <p className="tableInfo">
                                    <Image 
                                    src={`/images/group.png`}
                                    height={100}
                                    width={100}
                                    alt="zegar"
                                    className="tableIcon"/>
                                    Klasa
                                </p>
                                
                                </th>
                            <th>
                                <p className="tableInfo">
                                    <Image 
                                    src={`/images/person.png`}
                                    height={100}
                                    width={100}
                                    alt="zegar"
                                    className="tableIcon"/>
                                    Zastępca
                                </p>
                            </th>
                            <th>
                                <p className="tableInfo">
                                    <Image 
                                    src={`/images/book.png`}
                                    height={100}
                                    width={100}
                                    alt="zegar"
                                    className="tableIcon"/>
                                    Przedmiot
                                </p> 
                            </th>
                            <th className="last">
                                <p className="tableInfo">
                                    <Image 
                                    src={`/images/building.png`}
                                    height={100}
                                    width={100}
                                    alt="zegar"
                                    className="tableIcon"/>
                                    Sala 
                                </p> 
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* start map */}
                            {subs.length != 0 && subs.map((elem) => { 
                                return(
                                    elem[0] == subs.length-1 ? (
                                        <tr className="last">
                                            <td>0|7:15-8:00</td>
                                            <td>14Tp</td>
                                            <td>Marek Walica</td>
                                            <td>Zaj.prog.aplikacji internetowych i picia piwa na hołcynie</td>
                                            <td className="last">303</td>
                                        </tr>
                                    ) : (
                                        <tr key={elem[0]}>
                                            <td>{elem[2]}</td>
                                            <td>{elem[4]}</td>
                                            <td>{elem[7]}</td>
                                            <td>{elem[5]}</td>
                                            <td className="last">{elem[6]}</td>
                                        </tr> 
                                    )
                                )
                            })}
                            {/* end map */}
                        </tbody>

                        { subs.map( (elem, index) => {
                            return(
                              elem[0] == subs.length &&
                              <div className="whatever">Your Content</div>
                            )
                          })}
                    </table>
                    </div>
                    </span>
                </div>

            </div>
        </div>
    )
}