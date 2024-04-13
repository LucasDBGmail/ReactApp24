import '../styles/header.css'
import {
    Text,
    LogoutButton,
    useSession,
    CombinedDataProvider,
} from "@inrupt/solid-ui-react";

export default function Header() {
    const { session } = useSession();
    return (
        <>
            <html lang="en">
                <body>
                    <CombinedDataProvider
                        datasetUrl={session.info.webId}
                    >
                    </CombinedDataProvider>
                    {session.info.isLoggedIn ? (

                        <header>
                            <li>{session.info.webId}</li>
                            <LogoutButton></LogoutButton>
                        </header>
                    ) : (
                        <header>

                        </header>
                    )}
                </body>
            </html>
        </>
    )
}