"use client";

import {useRef, useState} from "react";
import Image from "next/image";

export default function DragAndDrop() {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingIcon, setLoadingIcon] = useState<string>('spinner.svg');

    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files["length"]; i++) {
                if (e.target.files[i].name.includes(".html")) {
                    setFiles([e.target.files[i]]);
                } else {
                    console.log("zły typ pliku")
                }
            }
        }
    }

    function handleSubmitFile(e: any) {
        if (files.length === 0) {
            // no file has been submitted
        } else {
            console.log(files[0])
            e.preventDefault()
            const formData = new FormData();
            formData.append("file", files[0]);
            fetch("/api", {
                method: "POST", body: formData,
            })
                .then(response => response.json())
                .then(data => console.log(data.message))
                .catch(error => console.error(error.error));
            setLoading(true)
            const timeout = setTimeout(() => {
                setLoadingIcon('check.png')
                setTimeout(() => {
                    setLoading(false)
                    setLoadingIcon('spinner.svg')
                }, 400)
            }, 600);
            return () => clearTimeout(timeout);
        }
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                if (e.dataTransfer.files[i].name.includes(".html")) {
                    setFiles([e.dataTransfer.files[i]]);
                    console.log(files)
                } else {
                    console.log("zły typ pliku")
                }
            }
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(fileName: any, idx: any) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    function deleteFile() {
        const formData = new FormData();
        formData.append("delete", "delete");
        fetch("/api", {
            method: "POST", body: formData,
        })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.error(error.error));
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoadingIcon('check.png')
            setTimeout(() => {
                setLoading(false)
                setLoadingIcon('spinner.svg')
            }, 400)
        }, 600);
        return () => clearTimeout(timeout);
    }

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
                <h1 className="header h-10vh"><span className="headerText">Zastępstwa</span></h1>
            <div className="flex items-center justify-center h-90vh">
                <form
                    className={`${dragActive ? "bg-color-light" : "bg-color"} file-form  p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                    onDragEnter={handleDragEnter}
                    onSubmit={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                >
                    <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        multiple={false}
                        onChange={handleChange}
                        accept=".html"
                    />

                    <p>
                        Upuść plik lub{" "}
                        <span
                            className="font-bold text-blue-600 cursor-pointer"
                            onClick={openFileExplorer}
                        >
            <u>Wybierz ręcznie</u>
          </span>{" "}
                    </p>

                    <div className="flex flex-col items-center p-3">
                        {files.map((file: any, idx: any) => (<div key={idx} className="flex flex-row space-x-5">
                            <span>{file.name}</span>
                            <span
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeFile(file.name, idx)}
                            >
                usuń
              </span>
                        </div>))}
                    </div>

                    <button
                        className={`btn rounded-lg p-2 mt-3 w-auto hover:shadow ${files.length === 0 ? "hidden" : ""}`}
                        onClick={handleSubmitFile}
                    >
                        <span className="p-3 text-white">Prześlij</span>
                    </button>
                    <button
                        className={`btn rounded-lg p-2 mt-3 w-auto hover:shadow ${files.length === 0 ? "" : "hidden"}`}
                        onClick={deleteFile}
                    >
                        <span className="p-3 text-white">Brak zastępstw na dziś</span>
                    </button>
                    <br/>
                    <Image
                        className={`${loadingIcon === 'spinner.svg' ? 'rotate' : ''} ${loading ? "" : "hidden"}`}
                        src={`/images/${loadingIcon}`}
                        height={24}
                        width={24}
                        alt="loading"/>
                </form>
            </div>
            </div>
        </div>
    );
}