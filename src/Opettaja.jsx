import React, { Component } from 'react';
import './App.css';
import TunnitAdd from './TunnitAdd';
import TunnitEdit from './TunnitEdit';
import TunnitDelete from './TunnitDelete';
import Table from 'react-bootstrap/Table';

class Opettaja extends Component {

  constructor(props) {
    super(props);
    console.log("Opettaja-komponentti: constructor");
    this.state = { 
        tunnit: [], 
        start: 0,
        take: 10,
        visible: "table",
        renderChildAdd: true,   
        renderChildEdit: true,
        renderChildDelete: true,
        yksitunti: [], 
        poistatunti: [], 
        tuntiID: '',
        tuntiID2Del: ''  
    }; 
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  handleChildUnmountAdd(){
    console.log("Ollaan Opettaja -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    console.log("Ollaan Opettaja -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChildEdit: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete(){
    console.log("Ollaan Opettaja -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChildAdd: true})
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
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
    let uri = 'https://localhost:5001/api/opettaja/r?offset='+this.state.start+'&limit='+this.state.take;
    // let uri = 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({ tunnit: json }); //Viedään tulosjoukko (json) setState-komennolla tunnit -olioon
        });
}

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksitunti: dataObj, 
      visible: "editform", 
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan tunnuksen>>>>", dataObj); 
    alert("Poistan tunnuksen: " + dataObj.tunnitId); //Alertissa konkatenointi tehdään plussalla + 
    this.setState({
      poistatunti: dataObj, 
      visible: "deleteform", 
      renderChildDelete: true
    })
  }
 
  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("Opettaja-komponentti: render");
    let viesti = "NW Käyttäjä-rivejä: " + this.state.tunnit.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders=<tr><th></th><th>ID</th><th>Nimi</th><th>Sähköposti</th><th>Salasana</th><th></th></tr>;
    if (this.state.tunnit.length > 0) {
        for (let index = 0; index < this.state.tunnit.length; index++) {
            const element = this.state.tunnit[index];
            taulukko.push(<tr key={element.tunnitId}>
            <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
            <td >{element.tunnitId}</td>
                    <td>{element.luokkahuoneId}</td>
                    <td>{element.oppilasId}</td>
                    <td>{element.sisaan}</td>
                    <td>{element.ulos}</td>
            <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
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
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää tunti</button>
        <Table responsive="sm" className="table table-dark" id="t01">
              <thead>{tHeaders}</thead>
              <tbody>{taulukko}</tbody>
            </Table>
            <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
            <button onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
        <p>{viesti}</p>
      </div>
    );
    } else if (this.state.visible==="addform") {
      return (<div className="box4">
        <h1 className="text-center">Uuden käyttäjän lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <TunnitAdd unmountMe={this.handleChildUnmountAdd} /> : null }
      </div>
      );

    } else if (this.state.visible==="editform") {
      return (<div className="box4">
        <h1 className="text-center">Tuote tietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <TunnitEdit tuntiObj={this.state.yksitunti} unmountMe={this.handleChildUnmountEdit} /> : null }
      </div>
      );

    } else if (this.state.visible==="deleteform") {
      return (<div className="box4">
        <h1 className="text-center">tuntistietojen poiston vahvistus</h1>
        <div className="text-center">
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildDelete ? <TunnitDelete tuntiObj={this.state.poistatunti} unmountMe={this.handleChildUnmountDelete} /> : null }
      </div>
      );

    }  else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }
    

  }
}
export default Opettaja;