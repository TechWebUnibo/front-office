import {Container, Button, Spinner} from 'react-bootstrap'
import RentalCard from './RentalCard';
import { getRentals, getUser } from '../utility/apiLibrary'
import { useState, useEffect } from 'react';

const Rentals = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect( () => {
        f();
    }, []);

    async function f()  {

        let response = await getRentals({productName:true, customer: getUser()});
        if(response) {
            setIsPending(false);
        }
        if(response.status === 200) {

        }
        else {
            setError(true);
        }
    }

    return(
        <Container>
            <h2 className="display-2">I tuoi noleggi</h2>
            {isPending && (
                <Container>
                    <Spinner animation="border" size="m"/>
                </Container>
            )}
            {error && (
                <Container>
            <h2> Uho, qualcosa è andato storto...</h2>
            <Button onClick={() => f()}> Ricarica</Button>
            </Container>
            )}
            <RentalCard id="12345" name="Sedia" img="../public/img/cardProfile.png" price="253.65" startDate="25/10/2021" endDate="11/11/2021" status="in corso"/>
        </Container>
    );
}
export default Rentals;