import Header from "../components/header";
import '../styles/home.css'
import {
    Text,
    LogoutButton,
    useSession,
    CombinedDataProvider,
} from "@inrupt/solid-ui-react";
import React, { useState, useEffect } from 'react';
import { fetch } from '@inrupt/solid-client-authn-browser'
import {
    getSolidDataset
} from "@inrupt/solid-client";
import { useNavigate } from "react-router-dom";
import { overwriteFile, deleteFile } from "@inrupt/solid-client";

const authOptions = {
    clientName: "Solid App",
};


export default function Home() {
    const { session } = useSession();
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const [myDataset, setMyDataset] = useState(null);
    const [selectedUrl, setSelectedUrl] = useState(null);
    var readingListUrl = '';


    function trimToRoot(url) {
        const rootMatch = url.match(/^https?:\/\/[^/]+/);
        return rootMatch ? rootMatch[0] : null;
    }


    if (session && session.info && session.info.webId) {
        readingListUrl = trimToRoot(session.info.webId);
    }



    useEffect(() => {
        if (readingListUrl) {
            getSolidDataset(readingListUrl, { fetch: fetch })
                .then(result => {
                    const data = result.graphs.default;
                    result = Object.keys(data)
                    setUrls(result);
                    setMyDataset(result);

                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [readingListUrl]);



    async function RemoveFile() {
        try {
            await deleteFile(
                selectedUrl,
                { fetch: fetch }
            );
            getSolidDataset(readingListUrl, { fetch: fetch })
                .then(result => {
                    const data = result.graphs.default;
                    result = Object.keys(data)
                    setUrls(result);
                    setMyDataset(result);

                })
        } catch (err) {
            console.error(err);
        }
    }

    function UploadFile() {
        const fileList = document.getElementById('fileinput').files;
        writeFileToPod(fileList[0], `/${fileList[0].name}`, fetch);
    }

    async function writeFileToPod(file, targetFileURL, fetch) {
        try {
            const savedFile = await overwriteFile(
                readingListUrl + targetFileURL,
                file,
                { contentType: file.type, fetch: fetch }
            );


            getSolidDataset(readingListUrl, { fetch: fetch })
                .then(result => {
                    const data = result.graphs.default;
                    result = Object.keys(data)
                    setUrls(result);
                    setMyDataset(result);

                })

        } catch (error) {
            console.error(error);
        }
    }

    const handleUrlClick = (url) => {
        setSelectedUrl(url);
    };

    return (
        <div className="app-container">
            <div   >
                <Header />
                <h1 align="center" >SOLID POD TEST</h1>
            </div>
            {session.info.isLoggedIn ? (
                <CombinedDataProvider
                    datasetUrl={session.info.webId}
                    thingUrl={session.info.webId}
                >
                    
                    <br></br>
                    <br></br>
                    <div className="message logged-in">

                        <span>You are logged in as: </span>
                        <Text properties={[
                            "http://www.w3.org/2006/vcard/ns#fn",
                            "http://xmlns.com/foaf/0.1/name",
                        ]} />

                        <button onClick={() => RemoveFile()}>
                            Delete
                        </button>

                        <input type="file" id="fileinput" name="fileinput" multiple="multiple" />
                        <button onClick={() => UploadFile()}>
                            Upload
                        </button>
                    </div>
                    <div class="podfiles">
                        <h2>List of Pod files:</h2>
                        <ul>
                            {urls.map((url, index) => (
                                <li key={index} onClick={() => handleUrlClick(url)} style={{ cursor: 'pointer' }}>
                                    {url === selectedUrl ? <b>{url}</b> : url}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CombinedDataProvider>
            ) : (
                <div className="NotLoggedIn">
                    <h1>USER IS NOT LOGGED IN</h1>
                    <a href="/login">
                        <button>Log in</button>
                    </a>
                </div>
            )}
        </div>
    )
}





