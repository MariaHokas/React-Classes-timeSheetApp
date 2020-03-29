import React, { Component } from 'react';
import './App.css';
import TunnitSisaan from './TunnitSisaan';

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
        renderChildAdd: true,   
        yksitunnit: [],  
        tunnitID: '',
        tunnitID2Del: ''  
    }; 
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
  }

  handleChildUnmountAdd(){
    console.log("Ollaan NWtunnitsFetch -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }
  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "table", renderChildAdd: true})
  }
  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({start: startvalue},this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({start: this.state.start+10},this.handleSubmit);
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
    let tHeaders=<tr><th>ID</th><th>Luokkahuone</th><th>Oppilas</th><th>Sisään</th><th>Ulos</th><th></th></tr>;
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
    if (this.state.visible==="table") {
      return (<div className="box4">
        <h1 className="text-center">Tietokantahaku tunnit</h1>
        <TunnitSisaan unmountMe={this.handleChildUnmountAdd} /> 

        <Table responsive="sm" className="table table-dark" id="t01">
              <thead>{tHeaders}</thead>
              <tbody>{taulukko}</tbody>
            </Table>
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
        <p>{viesti}</p>
        <h1 className="text-center">Uuden käyttäjän lisäys</h1>
        <div>
        </div>
        
      </div>
      
    );
    }    else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
    

  }
}
export default Tunnit;