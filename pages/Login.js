import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [loaderLog, setLoaderLog] = useState(false);

    // Function to handle login
    const HandleLogin = () => {
        setLoaderLog(true);
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login successful
                setLoaderLog(false);
                const user = userCredential.user;

                setUser(user);
                router.push('/');
                // You can also navigate to a different page or update your UI here

            })
            .catch((error) => {
                // Handle error
                setLoaderLog(false);
                alert("Please enter valid details")

            });
    };

    // Function to handle logout
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Logout successful

                setUser(null);
                // You can also navigate to a different page or update your UI here
            })
            .catch((error) => {
                // Handle error

            });
    };

    // UseEffect to initialize Firebase app and listen for auth state changes
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);




    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="shadow p-5 rounded">
                <h1 className="text-center mb-4">Welcome to Login Page</h1>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    autoComplete='off'
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    autoComplete='off'

                    // value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {user ? (
                    <div>
                        <p className="text-center">User is logged in</p>
                        <button className="btn btn-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-center">User is not logged in</p>
                        {loaderLog ? "Loading..." :
                            <button onClick={HandleLogin} className='btn btn-primary btn-block mt-3'>Login</button>}
                        <Link href={"/SignUp"} className='btn text-primary btn-block mt-3'>SignUp</Link>
                    </div>
                )}
                <div id=""></div>
            </div>
        </div>
    );
};

export default Login;
