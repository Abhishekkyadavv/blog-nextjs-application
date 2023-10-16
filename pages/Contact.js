import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/clientApp';
import Baseof from './Baseof';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
    const [loader, setLoader] = useState(false);
    const [pageValues, setPageValues] = useState({
        name: '',
        email: '',
        message: '', // fixed typo here
        subject: '',
    });

    const Submitbtn = async (id = 8) => {
        console.log("pageValues", pageValues)
        setLoader(true);
        const docRef = collection(db, 'contact');
        await setDoc(doc(docRef), pageValues)
            .then(() => {
                setLoader(false);
            })
            .catch(() => {
                setLoader(false);
            }).finally(() => {
                setLoader(false);

            })
    };

    return (
        <>
            <section className="section">
                <Baseof title={'My contact page'} content={'My page contact'} key={'My contact page'} />
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6}>
                            <div className="contact-form shadow p-4">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            required
                                            value={pageValues.name}
                                            onChange={(e) => setPageValues({ ...pageValues, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            required
                                            value={pageValues.email}
                                            onChange={(e) => setPageValues({ ...pageValues, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={pageValues.subject}
                                            onChange={(e) => setPageValues({ ...pageValues, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">
                                            Message
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows="7"
                                            value={pageValues.message}
                                            onChange={(e) => setPageValues({ ...pageValues, message: e.target.value })}
                                        />
                                    </div>
                                    {loader ? (
                                        'Loading...'
                                    ) : (
                                        <button type="submit" onClick={() => Submitbtn()} className="btn btn-outline-primary">
                                            Submit Now
                                        </button>
                                    )}
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Contact;
