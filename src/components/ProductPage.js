import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";
import { useHistory, Link } from "react-router-dom";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";
import { createRent, getAvailability, getUser, modifyRent } from "../utility/apiLibrary";
import Notify from "./Notify";
import Explainer from "./Explainer";

const ProductPage = () => {

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(NaN)
    const [available, setAvailable] = useState(false)
    const [isLogged, setisLogged] = useState(true)

    // Modal control for error
    const [errorShow, setErrorShow] = useState(false);

    const location = useLocation()
    const { props, product } = location.state

    let availableAlert = isLogged ? (<Alert variant={available ? 'success' : 'danger'}>Questo prodotto è <Alert.Link as={"span"}>{available ? 'dispnibile' : 'non disponibile'}</Alert.Link></Alert>) : ''

    useEffect(() => {
        async function refreshPrice() {
            if (Date.parse(startDate) < new Date().setHours(23, 59, 59)) {
                setAvailable(false)
            }
            else {
                let res
                if(props.rentId)
                    res = await getAvailability(product._id, startDate, endDate, props.rentId)
                else
                    res = await getAvailability(product._id, startDate, endDate)
                if (res) {
                    setPrice(res.price)
                    if (typeof res.available !== 'undefined') {
                        setAvailable(res.available)
                        setisLogged(true)
                        setProducts(res.products)
                    }
                    else {
                        setisLogged(false)
                    }
                }
            }
        }
        const refresh = async () => {
            await refreshPrice()
        }
        refresh()
    }, [startDate, endDate, product, props.rentId])

    async function rentProduct() {
        let { status, body } = await createRent(await getUser(), startDate, endDate, price, products, product._id)
        if (status === 200) {
            history.push({
                pathname: '/confirm',
                state: {
                    rental: body.rent,
                    productName: product.name
                }
            })
        }
        else {
            setErrorShow(true)
        }
    }

    async function action(){
        if(props.action === 'modify'){
            await rentModify()
        }
        else{
            await rentProduct()
        }
    }

    async function rentModify() {
        let { status, body } = await modifyRent(props.rentId, startDate, endDate, price, products, product._id)
        if (status === 200) {
            history.push({
                pathname: '/confirm',
                state: {
                    rental: body.rent,
                    productName: product.name
                }
            })
        }
        else {
            setErrorShow(true)
        }
    }


    //explainer
    const title = "Perchè questo prezzo?";
    const message = "Abbiamo deciso di offrire in noleggio, in base alla disponibilità, il prodotto più economico. Chi arriva prima, meglio alloggia, no?";

    const history = useHistory();

    return (
        <Container className="">
            <Button variant="outline-primary" className="my-3" onClick={history.goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
                {props.backText} </Button>
            <Row>
                <Col sm lg={4}>
                    <Image src={product.img} fluid thumbnail="true" alt="product image" />
                </Col>
                <Col sm lg={8}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {(!isLogged || available) && (<Alert variant="info">
                        A partire da:   <Alert.Link as={"span"}>{price}€ </Alert.Link>
                        <Explainer message={message} title={title}/>
                    </Alert>)}
                    {!isLogged && (
                        <Alert variant="warning"><Alert.Link as={Link} to="/login" href="/login">Fare Login per verificare la disponibilità</Alert.Link> </Alert>
                    )}
                    {availableAlert}

                    <label htmlFor="start">Inserire un periodo:</label>
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                        locale="it-IT"
                        onChange={(update) => {
                            for (const date of update) {
                                if(date)
                                    date.setHours(23, 59, 58)
                            }
                            setDateRange(update);
                        }}
                        withPortal
                    />
                    <Button variant="primary" className="mt-4" onClick={action} disabled={!isLogged || !available}>
                        {props.confirmText}
                    </Button>
                </Col>
            </Row>
            <Notify
                show={errorShow}
                data={{ title: 'Ooops...', text: 'Something gone wrong, please retry later' }}
                onHide={() => setErrorShow(false)}
            />
            
        </Container>

    );
}

export default ProductPage;