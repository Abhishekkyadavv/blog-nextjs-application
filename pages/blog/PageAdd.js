import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { db } from '../../firebase/clientApp';

const PageAdd = () => {
    const [Jsondata, sedtJsonData] = useState(
        []
    );
    var collectionRef = collection(db, 'blogid');
    const [generatedId, setGeneratedId] = useState('');
    const router = useRouter();

    const addArray = async (type) => {
        try {
            let randomId;
            let isUnique = false;

            while (!isUnique) {
                randomId = Math.floor(Math.random() * 1000000); // Generate a random number ID
                const q = query(collectionRef, where('id', '==', randomId)); // Check if the ID already exists
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // ID is unique, no matching documents found
                    isUnique = true;
                }
            }

            const docRef = await addDoc(collectionRef, { id: randomId }); // Save the document with the generated ID
            setGeneratedId(randomId.toString()); // Convert the ID to a string and set it in the state
            console.log('Unique ID generated:', randomId);
            console.log('Document ID:', docRef.id);

            const pushData = {
                id: randomId.toString(),
                type,
                heading: type === 'heading' ? '' : null,
                para: type === 'text' ? '' : null,
                media:
                    type === 'media' || type === 'video' || type === 'image'
                        ? {
                            url: '',
                            thumbnail: '',
                        }
                        : null,
            };

            sedtJsonData((prevItems) => [...prevItems, pushData]);
        } catch (error) {
            console.error('Error adding array:', error);
        }

    }

    const handleChange = (index, value, type) => {
        const newData = [...Jsondata];
        if (type == "Heading") {
            newData[index].heading = value;
            sedtJsonData(newData);
        }
        if (type == "Image") {
            newData[index].media.url = value;

            sedtJsonData(newData);
        }
        if (type == "Video") {
            newData[index].media.url = value;

            sedtJsonData(newData);
        }
        if (type == "Text") {
            newData[index].text = value;

            sedtJsonData(newData);
        }

    }




    const [post, setPost] = useState(null);

    const getBlogPost = async () => {
        const pageQuery = router.query.val.toString();
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


            };
        });
        { blogPost }
        sedtJsonData(blogPost[0].data);
        setPost(blogPost);
    };
    const [loader, setLoader] = useState(false)
    function updateFunction(id) {
        setLoader(true)
        const docRef = doc(db, 'blog', id);
        updateDoc(docRef, {
            data: Jsondata,
        }).then((res) => {
            setLoader(false)
            router.push("/")
        })
    }

    useEffect(() => {
        if (router.query.val) {
            getBlogPost();
        }
    }, [router.query.val]);


    if (!post) {
        return <div>Loading...</div>;
    }
    console.log("jsonnnn", Jsondata)
    const DeleteDataById = (id) => {
        sedtJsonData((prevItems) => prevItems.filter((item) => item.id !== id));

        DeleteDataById(id)
    };
    return (
        <>
            <h1>Blog Application</h1>
            <h3>{post && post[0].title}</h3>
            <>
                <input type='text' placeholder='Enter Title' />
                {Jsondata && Jsondata.map((res, index) => {
                    return <div key={index}>
                        {/* <h1>Blog Application</h1> */}
                        {res.type == "heading" ?
                            <> <input type='text' defaultValue={res.heading} onChange={(e) => handleChange(index, e.target.value, "Heading")} placeholder='Heading' /> <button onClick={() => DeleteDataById(res.id)}>X</button></> : ""}
                        {res.type == "image" ?
                            <>  <input type='text' defaultValue={res.media.url} onChange={(e) => handleChange(index, e.target.value, "Image")} placeholder='Image' /><button onClick={() => DeleteDataById(res.id)}>X</button></> : ""}
                        {res.type == "video" ?
                            <> <input type='text' defaultValue={res.media.url} onChange={(e) => handleChange(index, e.target.value, "Video")} placeholder='Video' /><button onClick={() => DeleteDataById(res.id)}>X</button></> : ""}
                        {res.type == "text" ?
                            <>  <input type='text' defaultValue={res.text} onChange={(e) => handleChange(index, e.target.value, "Text")} placeholder='Text' /><button onClick={() => DeleteDataById(res.id)}>X</button></> : ""}

                    </div>

                })}
            </>
            <br></br> <button onClick={() => addArray("video")}>Video</button><br></br>
            <button onClick={() => addArray("image")}>Image</button><br></br>
            <button onClick={() => addArray("text")}>Text</button><br></br>
            <button onClick={() => addArray("heading")}>Heading</button><br></br>
            {loader ? "Loading..." :
                <>
                    <button onClick={() => updateFunction(post[0].id)}>Update</button><br></br>

                </>
            }
        </>

    )
}

export default PageAdd