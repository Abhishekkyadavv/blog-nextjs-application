import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { db } from '../../firebase/clientApp';

const PageAdd1 = () => {
    const [Jsondata, sedtJsonData] = useState(
        []
    );

    function addArray(type) {
        var pushData1 = {
            "id": 5,
            "type": type,
            "storiesurl": type == "storiesurl" ? "" : null,

        }

        sedtJsonData(prevItems => [...prevItems, pushData1]);


    }
    const handleChange = (index, value, type) => {
        const newData = [...Jsondata];
        if (type == "storiesurl") {
            newData[index].storiesurl = value;
            sedtJsonData(newData);
        }


    }




    const router = useRouter();
    const [post, setPost] = useState(null);

    const getBlogPost = async () => {
        const pageQuery = router.query.val.toString();
        const blogRef = collection(db, "stories");
        const q = query(blogRef, where("pageName", "==", pageQuery));
        const querySnapshot = await getDocs(q);
        const blogPost = querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                title: doc.data().title,

                createAt: doc.data().createAt,

                storiesThumnai: doc.data().storiesThumnai,
                imgUrl: doc.data().imgUrl,


            };
        });
        { blogPost }
        sedtJsonData(blogPost[0].imgUrl);
        setPost(blogPost);
    };
    const [loader, setLoader] = useState(false)
    function updateFunction(id) {
        setLoader(true)
        const docRef = doc(db, 'stories', id);
        updateDoc(docRef, {
            imgUrl: Jsondata,
        }).then((res) => {
            setLoader(false)

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

    return (
        <>
            <h1>More Stories Add</h1>
            {/* <h3>{post && post[0].title}</h3> */}
            <>
                <input type='text' placeholder='Enter Title' />
                {Jsondata && Jsondata.map((res, index) => {

                    return <div key={index}>
                        {/* <h1>Blog Application</h1> */}
                        {/* {res.type == "storiesurl" ? */}
                        {true ?
                            <input type='text' defaultValue={res.storiesurl} onChange={(e) => handleChange(index, e.target.value, "storiesurl")} placeholder='Stories Url' /> : ""}


                    </div>

                })}
            </>
            <br></br>
            <button onClick={() => addArray("storiesurl")}>Stories Url Add</button><br></br>
            {loader ? "Loading..." :
                <>
                    <button onClick={() => updateFunction(post[0].id)}>SUBMIT</button><br></br>

                </>
            }
        </>

    )
}

export default PageAdd1