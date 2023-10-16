import Image from "next/image";
import Link from "next/link";

import { Container, Row, Col, Card } from "react-bootstrap";

const BlogDataShow = (props) => {

    var data = props.data;
    // Loop through the data to create cards
    const renderCards = () => {
        return data && data.map((item, index) => {
            // Check if it's the first row
            if (index === 0) {
                // Render only one card in the first row
                return (
                    <Row key={item.id} className="mt-4">

                        <Col >
                            <Card>
                                {/* <Card.Img variant="top" src={item.imgThumnai} /> */}
                                {item.imgThumnai ? <Image
                                    className="imageContainer"
                                    src={item.imgThumnai}
                                    alt="Image description"
                                    layout="fill"
                                    objectFit="cover"
                                    quality={75}
                                /> : null}
                                <Card.Body>
                                    <Link href={`/blog/${item.pageName}`} className="block hover:text-primary">
                                        <Card.Title> {item.title}</Card.Title>
                                    </Link>
                                    <Card.Text>{item.para}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                );
            } else {
                // Render two cards per row for subsequent rows
                return (

                    <Col sm={6} key={index} className="mt-4">
                        <Card>
                            {/* <Card.Img variant="top" src={item.imgThumnai} /> */}
                            {item.imgThumnai ? <Image
                                className="imageContainer"

                                src={item.imgThumnai}
                                alt="Image description"
                                layout="fill"
                                objectFit="cover"
                                quality={75}
                            /> : null}
                            <Card.Body>
                                <Link href={`/blog/${item.pageName}`} className="block hover:text-primary">
                                    <Card.Title> {item.title}</Card.Title>
                                </Link>
                                <Card.Text>{item.para}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                );
            }
        });
    };

    return (
        <Container>
            <Row className="mt-4">

                {renderCards()}
            </Row>
        </Container>
    );
};

export default BlogDataShow;
