import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";
import { useHistory, Link } from "react-router-dom";
import {
  createRent,
  getAvailability,
  getUser,
  modifyRent,
} from "../utility/apiLibrary";

import "../style/ProductPage.css";
import "react-datepicker/dist/react-datepicker.css";

import Notify from "../components/Notify";
import Explainer from "../components/Explainer";
import seo from "../utility/dynamicPageTitle";

const ProductPage = ({ loggedIn }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(NaN);
  const [available, setAvailable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  // Modal control for error
  const [errorShow, setErrorShow] = useState(false);

  const location = useLocation();
  const { props, product } = location.state;

  let availableAlert = isLoggedIn ? (
    <Alert variant={available ? "success" : "danger"}>
      Questo prodotto è{" "}
      <Alert.Link as={"span"}>
        {available ? "disponibile" : "non disponibile"}
      </Alert.Link>
    </Alert>
  ) : (
    ""
  );

  useEffect(() => {
    setIsLoggedIn(loggedIn);
    async function refreshPrice() {
      if (Date.parse(startDate) < new Date().setHours(0, 0, 1)) {
        setAvailable(false);
      } else {
        let res;
        if (props.rentId)
          res = await getAvailability(
            product._id,
            startDate,
            endDate,
            props.rentId
          );
        else res = await getAvailability(product._id, startDate, endDate);
        if (res) {
          setPrice(res.price);
          if (typeof res.available !== "undefined") {
            setAvailable(res.available);
            setIsLoggedIn(true);
            setProducts(res.products);
          } else {
            setIsLoggedIn(false);
          }
        }
      }
      console.log(isLoggedIn);
    }
    const refresh = async () => {
      await refreshPrice();
    };
    //Dynamic page title
    seo({ title: product.name+" | Cater", metaDescription: "Pagina del prodotto" });
    refresh();
  }, [startDate, endDate, product, props.rentId, isLoggedIn, loggedIn]);

  async function rentProduct() {
    let { status, body } = await createRent(
      await getUser(),
      startDate,
      endDate,
      price,
      products,
      product._id
    );
    if (status === 200) {
      history.push({
        pathname: "/confirm",
        state: {
          rental: body.rent,
          productName: product.name,
        },
      });
    } else {
      setErrorShow(true);
    }
  }

  async function action() {
    if (props.action === "modify") {
      await rentModify();
    } else {
      await rentProduct();
    }
  }

  async function rentModify() {
    let { status, body } = await modifyRent(
      props.rentId,
      startDate,
      endDate,
      price,
      products,
      product._id
    );
    if (status === 200) {
      history.push({
        pathname: "/confirm",
        state: {
          rental: body.rent,
          productName: product.name,
        },
      });
    } else {
      setErrorShow(true);
    }
  }

  //explainer
  const title1 = "Perchè questo prezzo?";
  const message1 =
    "Abbiamo deciso di offrire in noleggio, in base alla disponibilità, il prodotto più economico. Chi arriva prima, meglio alloggia, no?";
  const title2 = "Scopri l'offerta";
  const message2 =
    `Non farti rincorrere dall'ansia! Se un noleggio che comprende il weekend finisce nei giorni lavorativi successivi, 
      questi vengono scontati del 50%! Così hai tutto il tempo che ti serve per fare su baracca senza fretta o servire qualche delizioso piatto in più!`;

  const history = useHistory();

  return (
    <Container className="containerSM">
      <Button
        variant="outline-primary"
        className="my-3"
        onClick={history.goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
        {props.backText}{" "}
      </Button>
      <Row>
        <Col sm lg={4}>
          <Image src={product.img} fluid thumbnail="true" alt="product image" />
        </Col>
        <Col sm lg={8}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {(!isLoggedIn || available) && (
            <Alert variant="info">
              A partire da: <Alert.Link as={"span"}>{price}€ </Alert.Link>
              <Explainer message={message1} title={title1} />
            </Alert>
          )}
          {!isLoggedIn && (
            <Alert variant="warning">
              <Alert.Link as={Link} to="/login" href="/login">
                Fare Login per verificare la disponibilità
              </Alert.Link>{" "}
            </Alert>
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
                if (date) date.setHours(23, 59, 58);
              }
              setDateRange(update);
            }}
            withPortal
          />
          <Row>
            <div id="discount">
              <p className="">
                Offerta "Il lunedì è sempre un dramma" 
                <Explainer title={title2} message={message2} className="mx-3"/>
              </p>
            </div>
          </Row>
          <Button
            variant="primary"
            className=""
            onClick={action}
            disabled={!isLoggedIn || !available}
          >
            {isLoggedIn ? props.confirmText : "Login necessario"}
          </Button>
        </Col>
      </Row>

      <Notify
        show={errorShow}
        data={{
          title: "Ooops...",
          text: "Something gone wrong, please retry later",
        }}
        onHide={() => setErrorShow(false)}
      />
    </Container>
  );
};

export default ProductPage;
