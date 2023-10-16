import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import connectToDatabase from '../../firebase/clientApp';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    // useEffect(() => {
    //     const establishMongoDBConnection = async () => {
    //         try {
    //             // Connect to the MongoDB database
    //             const db = await connectToDatabase();

    //             // Print a success message in the console
    //             console.log('MongoDB connection successful');
    //         } catch (error) {
    //             console.error('MongoDB connection error:', error);
    //         }
    //     };

    //     establishMongoDBConnection();
    // }, []);
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>
                            Welcome to My Blog Application! We are a platform for sharing
                            thoughts, ideas, and stories. Join us today and start writing
                            your own blog posts!
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: info@myblogapp.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Connect with Us</h5>
                        <div className="d-flex">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaFacebook />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        <p>&copy; {currentYear} My Blog Application. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
