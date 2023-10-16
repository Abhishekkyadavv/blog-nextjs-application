
// first header
import menu from "../config/menu.json";
import Link from 'next/link';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { db } from '../../firebase/clientApp';


const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    const LogOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Logout successful

                setUser(null);
                // You can also navigate to a different page or update your UI here
            })
            .catch((error) => {
                // Handle error
                sessionStorage.setItem("email", "");

            });
    };
    return (
        <div className="header-de">
            <ul className="mb-8 space-x-4">
                {menu.main.map((menu) => {
                    if (user && menu.name == "Login") {
                        return <>
                            <li className="inline-block" key={menu.name}>
                                <a href={""} onClick={() => LogOut()} className="p-4 text-light hover:text-white">
                                    Logout
                                </a>
                            </li>
                        </>
                    } else {
                        return <li className="inline-block" key={menu.name}>
                            <Link href={menu.url} className="p-4 text-light hover:text-white">
                                {menu.name}
                            </Link>
                        </li>
                    }

                }

                )}
            </ul>

        </div>
    )
}

export default Header

