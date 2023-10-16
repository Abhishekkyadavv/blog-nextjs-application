
import { setDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase/clientApp';

const AddBlog = () => {
    const [bodyData, sedbodyData] = useState(
        [{
            "id": "",
            "pageName": "",
            "createAt": new Date().toDateString(),
            "title": "",
            "imgThumnai": "",
            "para": "",
            "description": ""
        }]
    );
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);

    const SubmitBtn = async (value) => {
        setLoader(true);
        const uniqueId = uuidv4();
        const boddy = bodyData;
        const boddt = bodyData;
        boddy[0].id = uniqueId
        boddt[0].data = "";
        const docRef = doc(db, 'blogs', uniqueId);

        const docRef2 = doc(db, 'blog', uniqueId);
        // var pushData2 = {

        // }
        // sedbodyData(prevItems => [...prevItems, pushData2]);


        setDoc(docRef, boddy[0])
            .then(() => {
                setDoc(docRef2, boddt[0])
                setOpen(false)
                setLoader(false);


            })
            .catch((error) => {
                setOpen(false)
                setLoader(false);

            });

    };
    const handleChange = (value, type) => {

        const newData = [...bodyData];

        if (type == "Url") {
            bodyData[0].imgThumnai = value;
            sedbodyData(newData);
        }
        if (type == "Title") {


            bodyData[0].title = value;
            bodyData[0].pageName = value;

            sedbodyData(newData);
        }

        if (type == "Text") {
            bodyData[0].para = value;
            sedbodyData(newData);
        }
        if (type == "Description") {
            bodyData[0].description = value;
            sedbodyData(newData);
        }

    }
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);



    useEffect(() => {
        const getPosts = async () => {
            const postsCollection = collection(db, "blog");
            const postsSnapshot = await getDocs(postsCollection);
            const postsList = postsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postsList);
        };
        getPosts();

    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                getuserDetails(user.uid);
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const getuserDetails = async (userId) => {
        const blogRef = collection(db, "users");
        const q = query(blogRef, where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const blogPost = querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                role: doc.data().role,
                email: doc.data().email,

            };
        });
        { blogPost }
        setUserDetails(blogPost[0]);
    };


    const getBlogPost = async () => {
        const blogRef = collection(db, "users");
        const querySnapshot = await getDocs(blogRef);
        const blogPost = querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                email: doc.data().email,
                role: doc.data().role,
            };
        });
        { blogPost }
        setPosts1(blogPost);

    };
    useEffect(() => {
        getBlogPost();

    }, []);






    return (
        <>

            {userDetails && userDetails.role == "admin" ?
                <>
                    <button onClick={() => setOpen(true)}
                    >Add</button><br></br>
                </>
                : ""}





            {open ?
                <div className="popup-container">
                    <div className='addform'>
                        <h2 className='titleis'>Add Data</h2>
                        <a href='#' className='cross' onClick={() => setOpen(false)}>X</a>
                        <input type='text' placeholder='Url' onChange={(e) => handleChange(e.target.value, "Url")} />
                        <input type='text' placeholder='Title' onChange={(e) => handleChange(e.target.value, "Title")} />
                        <input type='text' placeholder='Text' onChange={(e) => handleChange(e.target.value, "Text")} />
                        <input type='text' placeholder='Description' onChange={(e) => handleChange(e.target.value, "Description")} />
                        {loader ? "Loading..." : <><button onClick={SubmitBtn}>Submit</button><br></br><br></br><br></br></>}
                    </div>
                </div>
                : ""}


        </>

    )
}

export default AddBlog


