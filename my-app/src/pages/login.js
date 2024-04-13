import '../styles/login.css'
import {
    LoginButton,
    useSession,
    CombinedDataProvider,
} from "@inrupt/solid-ui-react";
 
import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { handleIncomingRedirect, EVENTS } from "@inrupt/solid-client-authn-browser";  


const authOptions = {
    clientName: "Solid App",
};

export default function Login() {
    const { session } = useSession();
    
    console.log("Session data from login page:", session.info.isLoggedIn);
    console.log("Session data from login page:", session);

    const [provider, setProvider] = useState("");
    
    const handleProviderChange = (e) => {
        setProvider(e.target.value);
    };

 
    return (
        <div>
            <br></br>
            <div className='loginContainer'>
                {session.info.isLoggedIn ? (
                    <div className="message">
                        <span>You are logged in. </span>
                    </div>
                ) : (
                    <div className="message">
                        <h1>You are not logged in. </h1>
                        <br></br>
                        <div className="dropdown">
                            <select onChange={handleProviderChange} value={provider}>
                                <option value="">Select Provider</option>
                                <option value="https://inrupt.net/">Inrupt.net</option>
                                <option value="https://login.inrupt.com">login.inrupt.com</option>
                                <option value="https://solidcommunity.net">solidcommunity.net</option>
                                <option value="https://solidweb.org">solidweb.org</option>
                                <option value=" ">pod</option>
                            </select>
                        </div>
                        <LoginButton
                            oidcIssuer={provider}
                            redirectUrl='http://localhost:3000'
                            authOptions={authOptions}
                        />
                    </div>
                )}
            </div>
        </div>

    )
}