
//********** */
import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { Form, Input, Button } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Home.module.css'
import { db } from '../../firebase/clientApp';
import { collection, addDoc } from 'firebase/firestore';
const MyFormItemContext = React.createContext([]);
function toArr(str) {
    return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};
const DataBlog = () => {

    const getInitialData1 = {
        heading: '',
        vedioThumb: '',
        subHeading: '',
        paragraph: '',
        imageUrl: '',
        vedioUrl: ''
    };


    const [inputDataList, setinputDataList] = useState([]);
    const handleAddClick = () => {
        setinputDataList([...inputDataList, getInitialData1]);
    };
    const handleRemoveClick = (index, e) => {
        const newList = [...inputDataList];
        newList.splice(index, 1);
        setinputDataList(newList);
    };
    const [data, setData] = useState();
    const [loader, setloader] = useState(false);

    const onFinish = async (value) => {
        var PageName = value.name.title.split(" ").join("_");


        setloader(true);
        addDoc(collection(db, 'blog'), {
            title: value.name.title,
            pageName: PageName,
            createdAt: new Date(),

            subtitle: value.name.subtitle,
            sector: value.name.sector,
            percentageValue: value.name.percentageValue,
            minInvestment: value.name.minInvestment,
            syndicate_docs: inputDataList.length == 0 ? [getInitialData1] : inputDataList
        })
            .then((docRef) => {
                setloader(false)

            })
            .catch((error) => {
                setloader(false)

            });

    };


    const [boxVal, setBoxVal] = useState();

    const CheckBoxVal = (e, index) => {
        if (e.target.checked == true) {
            setBoxVal(`true${index}`)
        } else {
            setBoxVal(`false${index}`)

        }

    }
    return (
        <>
            <div className="right_content">
                <div className="heading__top ht_heading">

                </div>

                <div className="form add_syndecate">
                    <Form className="anttd_form" name="form_item_path" layout="vertical" onFinish={onFinish}>

                        <MyFormItemGroup prefix={['name']}>
                            <MyFormItem name="title" label="Title">
                                <Input defaultValue={data && data.title} />
                            </MyFormItem>
                            <MyFormItem name="subtitle" label="Sub Title">
                                <Input defaultValue={data && data.subtitle} />
                            </MyFormItem>
                            <MyFormItem name="sector" label="Sector">
                                <Input />
                            </MyFormItem>
                            <MyFormItem name="percentageValue" label="Return">
                                <Input type='number' />
                            </MyFormItem>
                            <MyFormItem name="minInvestment" label="Minimum Investment">
                                <Input type='number' />
                            </MyFormItem>

                            {inputDataList.map((x, index) => {
                                return (
                                    <>
                                        <div className="addSection_title ">

                                            <h4>Section Detail</h4> <br></br>
                                            <div className='d-flex p-2'>
                                                <label>Heading</label><br></br>
                                                <input type='checkbox' onChange={(e) => CheckBoxVal(e, index)} /><br></br><br></br>
                                                <label>Image</label><br></br>
                                                <input type='checkbox' />
                                            </div>
                                        </div>
                                        <div className={'bdetail addsection' + index + 1 + '' + 'box'}>
                                            <Row>
                                                {boxVal == `true${index}` ?
                                                    <>
                                                        <Col lg={12}>
                                                            <label>Heading </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Heading"
                                                                className="validation_name w-100"
                                                                onChange={(event) => {

                                                                    const secArray = inputDataList;
                                                                    secArray[index].heading = event.target.value;
                                                                    setinputDataList([...secArray]);
                                                                }}
                                                                name="heading"
                                                                value={inputDataList[index].heading}
                                                            />
                                                            <span className={`full_legal_name${index} error`}></span>
                                                        </Col>
                                                    </>
                                                    : ""}

                                                <Col lg={12}>
                                                    <label>Image URL</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Image URL"
                                                        className="validation_name w-100"
                                                        onChange={(event) => {

                                                            const secArray = inputDataList;
                                                            secArray[index].imageUrl = event.target.value;
                                                            setinputDataList([...secArray]);
                                                        }}
                                                        name="imageUrl"
                                                        value={inputDataList[index].imageUrl}
                                                    />
                                                    <span className={`full_legal_name${index} error`}></span>
                                                </Col>
                                                <Col lg={12}>
                                                    <label>Vedio URL</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Vedio URL"
                                                        className="validation_name w-100"
                                                        onChange={(event) => {

                                                            const secArray = inputDataList;
                                                            secArray[index].vedioUrl = event.target.value;
                                                            setinputDataList([...secArray]);
                                                        }}
                                                        name="vedioUrl"
                                                        value={inputDataList[index].vedioUrl}
                                                    />
                                                    <span className={`full_legal_name${index} error`}></span>
                                                </Col>
                                                <Col lg={12}>
                                                    <label>Vedio Thumb Nail</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Vedio Thumb Nail"
                                                        className="validation_name w-100"
                                                        onChange={(event) => {

                                                            const secArray = inputDataList;
                                                            secArray[index].vedioThumb = event.target.value;
                                                            setinputDataList([...secArray]);
                                                        }}
                                                        name="vedioThumb"
                                                        value={inputDataList[index].vedioThumb}
                                                    />
                                                    <span className={`full_legal_name${index} error`}></span>
                                                </Col>
                                            </Row>

                                            <div className="indu_remove_btn row">
                                                <Col className="revove_btn mb-3" lg={12}>
                                                    <div className="removebtn2">
                                                        {inputDataList.length > 1 && (
                                                            <a
                                                                className="removebtn syndicates_btn edite_btn "
                                                                onClick={(e) => handleRemoveClick(index, e)}
                                                                name={x.fullLegalName}
                                                                value={x.userEmail}
                                                            // disabled={formData.is_in_relation_with_main == 1 ? true : false}
                                                            >
                                                                Remove
                                                            </a>
                                                        )}
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                            <div className="fullinput indiviual_inp row">
                                <Col sm={12}>
                                    <div className="Trust_ind_btn">
                                        {inputDataList.length <= 3 ? (
                                            <a
                                                className="syndicates_btn edite_btn Individual "
                                                onClick={handleAddClick}
                                            >
                                                Add Section
                                            </a>
                                        ) : null}
                                    </div>
                                </Col>
                            </div>
                        </MyFormItemGroup>

                        <div className="row">
                            <Col lg={12}>
                                {loader ? "Loading..." : <Button
                                    type="submit"
                                    htmlType="submit"
                                    className="syndicates_btn edite_btn submit "
                                >
                                    Submit
                                </Button>}
                            </Col>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default DataBlog;
