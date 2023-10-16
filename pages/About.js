import React from 'react'
import Baseof from './Baseof'
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <>
            <Baseof title={"My about page"} content={"My page title"} key={"My about page"} />
            <div>
                <h1> About Page</h1>
            </div>
        </>
    )
}

export default About