import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase/clientApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function UseBlogPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const postsCollection = collection(db, "blogs");
            const postsSnapshot = await getDocs(postsCollection);
            const postsList = postsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postsList);
        };
        getPosts();
    }, []);

    return posts;
}

function FetchDetails() {
    const [userDetais, setUserDetails] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                getuserDetails(user.uid);
            } else {
                // User is signed out
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
        setUserDetails(blogPost[0])
    }
    if (userDetais) {
        return userDetais

    }
}
export { UseBlogPosts };
export default FetchDetails;


