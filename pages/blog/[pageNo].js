import { useEffect, useState } from "react";

import { collection, query, where, getDocs, Firestore, deleteDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { db } from "../../firebase/clientApp";

import Baseof from "../Baseof";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import Link from "next/link";
import FetchDetails from "../lib/GetPosts";
import Image from "next/image";

const PageNo = () => {

    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [titleval, setTitle] = useState([]);
    const [val, setCValData] = useState([]);


    const getBlogPost = async () => {
        console.log("fff")

        const pageQuery = router.query.pageNo.toString();
        const blogRef = collection(db, "blog");
        const q = query(blogRef, where("pageName", "==", pageQuery));
        const querySnapshot = await getDocs(q);
        const blogPost = querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                title: doc.data().title,
                data: doc.data().data,

                createAt: doc.data().createAt,
                para: doc.data().para,
                imgThumnai: doc.data().imgThumnai,
                description: doc.data().description


            };
        });
        { blogPost }
        setPosts(blogPost[0].data);
        setTitle(blogPost[0])
        setCValData(blogPost[0])
    };
    useEffect(() => {
        if (router.query.pageNo) {
            getBlogPost();
        }
    }, [router.query.pageNo]);
    const datata = FetchDetails();


    async function DeleteDataById(id) {
        try {
            const collectionRef = collection(db, 'blog');
            const collectionRef1 = collection(db, 'blogs');
            const q = query(collectionRef, where('id', '==', id));
            const querySnapshot = await getDocs(q);
            const q1 = query(collectionRef1, where('id', '==', id));
            const querySnapshot1 = await getDocs(q1);

            querySnapshot.forEach((doc) => {
                // Delete each document that matches the ID
                deleteDoc(doc.ref);
            });
            querySnapshot1.forEach((doc) => {
                // Delete each document that matches the ID
                deleteDoc(doc.ref);
            });

            alert('Documents deleted successfully');
            router.push('/');

        } catch (error) {
            alert('Error deleting documents: ', error);
        }
    }



    return (



        <>

            <Baseof title={titleval.title} content={titleval.description} key={titleval.title} />
            <h1 className="text-center">{titleval.title}</h1>
            {posts && posts.map((res) => {
                return <>
                    <h3>{res.type == "heading" ? res.heading : ""}</h3>
                    {res.type == "image" ?
                        <Image
                            className="imageContainer"

                            src={res.type == "image" ? res.media.url : ""}

                            alt="Image description"
                            layout="fill"
                            objectFit="cover"
                            quality={75}
                        />
                        : null}
                    <p>{res.type == "text" ? res.text : ""}</p>

                </>
            })}
            {datata && datata.role == "admin" ? <Link href={`/blog/PageAdd?val=${titleval.title}`}><Button>Edit</Button></Link> : ""}
            {datata && datata.role == "admin" ? <Button className="m-4" onClick={() => { DeleteDataById(val.id) }}>Delete</Button> : ""}
        </>






    )
}

export default PageNo