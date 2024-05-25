"use client"

import {useState, useEffect} from "react";
import Image from "next/image"

export default function Display() {
    const [subs, setSubs] = useState([[[]]])

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setSubs(data))
            .catch(err => console.error(err))
    }, []);

    const [currentElementIndex, setCurrentElementIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentElementIndex(prevIndex => (prevIndex + 1) % subs.length);
        }, 4000)

        return () => clearInterval(interval)
    }, [subs]);

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
                <div className={`main ${ subs[0][0].length == 0 ? "gone" : ""}`}>
                    <span>
                        <div className="topInfo">
                            <p className="calendarTime">
                                <Image
                                    src={`/images/calendar.png`}
                                    height={100}
                                    width={100}
                                    alt="kalendarz"
                                    className="tableIcon"/>
                                {subs[currentElementIndex] &&
                                <span>{subs[currentElementIndex][0][1]}</span>
                                }
                            </p>
                            <p className="absentTeachers">
                                <p>George Negroid&nbsp;&nbsp;</p>
                                <p>Marek Walica&nbsp;&nbsp;</p>
                                <p>Janusz Pawlak&nbsp;&nbsp;</p>
                                <p>Draiusz Olszar&nbsp;&nbsp;</p>
                                <p>Anna Lechrich&nbsp;&nbsp;</p>
                                <p>Małgorzata Borski&nbsp;&nbsp;</p>
                                <p>Agnieszka Ptak&nbsp;&nbsp;</p>
                                <p>Adrian Pytel&nbsp;&nbsp;</p>
                                <p>Ireneusz Buchcik&nbsp;&nbsp;</p>
                                <p>Adrian Pytel&nbsp;&nbsp;</p>
                                <p>Ireneusz Buchcik&nbsp;&nbsp;</p>
                                <p>Adrian Pytel&nbsp;&nbsp;</p>
                                <p>Ireneusz Buchcik&nbsp;&nbsp;</p>
                                <p>Ireneusz Buchcik&nbsp;&nbsp;</p>
                            </p>
                        </div>
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
                                        src={`/images/book.png`}
                                        height={100}
                                        width={100}
                                        alt="zegar"
                                        className="tableIcon"/>
                                    Przedmiot
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
                            {subs[currentElementIndex].length != 0 && subs[currentElementIndex].map((elem, index) => {
                                return(
                                    index == subs[currentElementIndex].length-1 ? (
                                        <tr key={elem[0]} className="last">
                                             <td>{elem[2]}</td> {/* lekcja */}
                                            <td className="klasa">{elem[4]}</td> {/* klasa */}
                                            <td>{elem[5]}</td> {/* przedmiot */}
                                            <td>{elem[7]}</td> {/* zastępca */}
                                            <td className="last">{elem[6]}</td> {/* sala */}
                                        </tr>
                                    ) : (
                                        <tr key={elem[0]}>
                                            <td>{elem[2]}</td> {/* lekcja */}
                                            <td className="klasa">{elem[4]}</td> {/* klasa */}
                                            <td>{elem[5]}</td> {/* przedmiot */}
                                            <td>{elem[7]}</td> {/* zastępca */}
                                            <td className="last">{elem[6]}</td>  {/* sala */}
                                        </tr>
                                    )
                                )
                            })}
                            {/* end map */}
                        </tbody>
                    </table>
                    </div>
                    </span>
                </div>

            </div>
            <div className={`noSubs ${ subs[0][0].length == 0 ? "" : "gone"}`}>
                    Brak Zastępstw
            </div>
        </div>
    )
}