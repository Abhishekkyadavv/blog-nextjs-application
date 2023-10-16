import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase/clientApp';
import { collection, doc, setDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [checkLoader, setCheckLoader] = useState(false);
    const router = useRouter();

    // Function to handle login
    const handleLogin = () => {
        setCheckLoader(true);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login successful
                setCheckLoader(false);
                const user = userCredential.user;
                var cread = {
                    email: userCredential.user.email,
                    name: "",
                    id: userCredential.user.uid,
                    "role": "user"
                }
                LoginDetails(cread);
                updateField(userCredential.user.uid)
                setUser(user);
                // You can also navigate to a different page or update your UI here
                router.push('/');

            })
            .catch((error) => {
                setCheckLoader(false);

                // Handle error
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
    const updateField = async (userId) => {
        const userRef = doc(db, 'users', userId);

        // // Fetch the document snapshot
        // const userDoc = await getDoc(userRef);
        // await setDoc(
        //   userRef,
        //   { userId: userId },
        //   { merge: true }
        // );

    };


    const LoginDetails = async (data) => {
        data.name = name;
        const docRef = collection(db, 'users');
        await setDoc(doc(docRef), data)
            .then(() => {
            })
            .catch(() => {
            });
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="shadow p-5 rounded">
                <h1 className="text-center mb-4">Welcome to SignUp Page</h1>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="FullName"
                    value={name}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
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
                        {checkLoader ? "Loading..." :
                            <button className="btn btn-primary" onClick={() => handleLogin()}>
                                SignUp
                            </button>
                        }
                    </div>
                )}
                <div id=""></div>
            </div>
        </div>
    );
};

export default SignUp;
