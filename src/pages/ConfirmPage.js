import { Container, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Explainer from "../components/Explainer";

import seo from "../utility/dynamicPageTitle";

const ConfirmPage = () => {

    const location = useLocation()
    const { rental, productName } = location.state

    console.log(location.state)
    
    //Explainer
    const message =`L'ordine deve essere revisionato dai nostri addetti prima di poter essere erogato. Il nostro impegno è di fornire il miglior servizio al miglior prezzo. A volte però la merce viene restituita in condizioni peggiori rispetto ai nostri standard di qualità e questo potrebbe 
    influire sulla disponibilità dei prodotti. Cater si impegna sempre a fornire un servizio sul quale si può fare affidamento ma a volte forze di cause maggiori ce lo potrebbero impedire. Ci scusiamo in anticipo per l'eventualità`
    //Dynamic page title
    seo({title : 'Conferma ordine '+rental._id+' | Cater', metaDescription : 'La conferma per il tuo ordine'})

    return (
        <Container className="containerSM">
            <h2 className="title">Grazie per la tua prenotazione!</h2>
            <h3 className="sub-title">Il tuo noleggio è stato registrato:</h3>
            <div>
                <h4 className="text-danger">Ricorda, questa è solo una prenotazione di noleggio.
                <Explainer className="p-3" title={"Avviso sulla prenotazione"} message ={message}/>
            </h4>
            </div>
                        <ListGroup id="rental-overall">
                <ListGroup.Item>ID noleggio: {rental._id}</ListGroup.Item>
                <ListGroup.Item>Prodotto/i: {productName}</ListGroup.Item>
                <ListGroup.Item>Prezzo: {rental.price}€</ListGroup.Item>
                <ListGroup.Item>Inizio: {rental.start.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>Fine: {rental.end.split('T')[0]}</ListGroup.Item>
            </ListGroup>
            <p className='mt-2'>Si ricorda che si è ancora in tempo per modificare il noleggio andando nella pagina dei noleggi del profilo personale e selezionando 'modifica' sull'ordine da modificare.<Link to="/dashboard" classNmae="underlined">dashboard</Link></p>
        </Container>
    )
}

export default ConfirmPage