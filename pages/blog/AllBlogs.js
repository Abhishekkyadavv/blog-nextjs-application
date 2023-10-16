import React, { useState } from "react";
import UseBlogPosts from "../Blog00";
import Baseof from "../Baseof";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogDataShow from "./BlogDataShow";
import FetchDetails from "../lib/GetPosts";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../../firebase/clientApp";
import { setDoc, collection, doc, getDocs } from "firebase/firestore";
const AllBlogs = () => {
    const getPosts = UseBlogPosts();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [bodyData, sedbodyData] = useState(
        [{
            "id": "",
            "pageName": "",
            "createAt": new Date().toDateString(),
            "title": "",
            "imgThumnai": "",
            "para": "",
            "description": "",
            "category": "",
            "favourite": ""

        }]
    );



    // Calculate the total number of pages
    const totalPages = Math.ceil(getPosts.length / 2);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * 2;
    const endIndex = startIndex + 5;

    // Filter data based on search term
    const filteredPosts = getPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Get the data for the current page
    const currentPageData = filteredPosts.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to handle search term change
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };
    const SubmitBtn = async (value) => {
        setLoader(true);
        const uniqueId = uuidv4();
        const boddy = bodyData;
        const boddt = bodyData;
        boddy[0].id = uniqueId
        boddt[0].data = "";
        const docRef = doc(db, 'blogs', uniqueId);

        const docRef2 = doc(db, 'blog', uniqueId);
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
            var text = value;
            var dashedString = text.replace(/\s+/g, '-');
            bodyData[0].pageName = dashedString;
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
        if (type == "Category") {
            bodyData[0].category = value;
            sedbodyData(newData);
        }
        if (type == "Favourite") {
            bodyData[0].favourite = value;
            sedbodyData(newData);
        }

    }

    const datata = FetchDetails();

    return (
        <div>
            {datata && datata.role == "admin" ?
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
                        <input type='text' placeholder='Category' onChange={(e) => handleChange(e.target.value, "Category")} />
                        <input type='text' placeholder='Favourite' onChange={(e) => handleChange(e.target.value, "Favourite")} />

                        {loader ? "Loading..." : <><button onClick={SubmitBtn}>Submit</button><br></br><br></br><br></br></>}
                    </div>
                </div>
                : ""}
            <div>
                {/* Render search bar */}

                {/* Render data for the current page */}
                <Baseof title={"My blogs page"} content={"My page blogs"} key={"My blogs page"} />

                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchTermChange} />
                <div className="allBlogshow">
                    <BlogDataShow data={currentPageData} />


                </div>
            </div>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {/* Generate page numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>


    );
};

export default AllBlogs;
