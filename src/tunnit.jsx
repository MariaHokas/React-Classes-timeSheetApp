import React, { Component } from 'react';
import './App.css';
import TunnitLeimaus from './TunnitLeimaus';

import Table from 'react-bootstrap/Table';

class Tunnit extends Component {

    constructor(props) {
        super(props);
        console.log("NWtunnitsFetch-komponentti: constructor");
        this.state = {
            tunnit: [],
            start: 0,
            take: 10,
            visible: "table",
            renderChildleimaus: true,
            tunnitID: '',
        };
        this.handleChildUnmountleimaus = this.handleChildUnmountleimaus.bind(this);

    }
    handleChildUnmountleimaus() {
        console.log("Ollaan NWtunnitsFetch -handleChildUnmountleimaus-rutiinissa - - - - - - ");
        this.setState({ renderChildleimaus: false });
        this.handleClickTable();
        this.HaeNWRestApista();
    }
    handleClickTable = () => {
        this.setState({ visible: "table" })
    }
    handleSubmit() {
        console.log('HaeNWRestApista: . . . . handleSubmitissa');
        this.HaeNWRestApista();
    }

    HaeNWRestApista() {
        let uri = 'https://localhost:5001/api/tunnit';
        // let uri = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
        console.log("HaeOmaRestistä " + uri);
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ tunnit: json }); //Viedään tulosjoukko (json) setState-komennolla tunnit -olioon
            });
    }

    componentDidMount() {
        this.HaeNWRestApista();
    }
    render() {
        console.log("NWtunnitsFetch-komponentti: render");
        let viesti = "NW Käyttäjä-rivejä: " + this.state.tunnit.length;
        let taulukko = [];
        //Luodaan taulukon otsikot
        let tHeaders = <tr><th>ID</th><th>Luokkahuone</th><th>Oppilas</th><th>Sisään</th><th>Ulos</th><th></th></tr>;
        if (this.state.tunnit.length > 0) {
            for (let index = 0; index < this.state.tunnit.length; index++) {
                const element = this.state.tunnit[index];
                taulukko.push(<tr key={element.tunnitId}>
                    <td >{element.tunnitId}</td>
                    <td>{element.luokkahuoneId}</td>
                    <td>{element.oppilasId}</td>
                    <td>{element.sisaan}</td>
                    <td>{element.ulos}</td>
                </tr>);
            }
        }
        else {
            viesti = "Ladataan tietoja Northwind-tietokannasta..."
        }
        //Ehdollinen return
        if (this.state.visible === "table") {
            return (<div className="box4">
                <h1 className="text-center">Sisään leimaus</h1>
                <TunnitLeimaus unmountMe={this.handleChildUnmountleimaus} />
                <Table responsive="sm" className="table table-dark" id="t01">
                    <thead>{tHeaders}</thead>
                    <tbody>{taulukko}</tbody>
                </Table>
                <p>{viesti}</p>
                <h1 className="text-center">Täällä ollaan</h1>
                <div>
                </div>

            </div>

            );
        } else {
            return (<div className="box1">
                <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
            </div>
            );
        }
    }
}
export default Tunnit;