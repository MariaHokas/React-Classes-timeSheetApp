import React, {Component} from 'react';
import './App.css';
import LeimausAdd from './LeimausAdd';
import Table from 'react-bootstrap/Table';

class Tuntiraportti extends Component {


    constructor(props) {
        super(props);
        console.log("NWCustomerFetch-komponentti: constructor");
        this.state = { 
            tunnit: [], 
            start: 0,
            take: 10,
            visible: "table",
            renderChildAdd: true,   
            renderChildEdit: true,
            renderChildDelete: true,
            yksileimaus: [], 
            poistaleimaus: [], 
            idleimaus: '',
            LeimausID2Del: ''  
        }; 
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
      }
    
      handleChildUnmountAdd(){
        console.log("Ollaan NWCustomerFetch -handleChildUnmountAdd-rutiinissa - - - - - - ");
        this.setState({renderChildAdd: false});
        this.handleClickTable();
        this.HaeNWRestApista();
      }
    
      handleChildUnmountEdit(){
        console.log("Ollaan NWCustomerFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
        this.setState({renderChildEdit: false});
        this.handleClickTable();
        this.HaeNWRestApista();
      }
    
      handleChildUnmountDelete(){
        console.log("Ollaan NWCustomerFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
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
        let uri = 'https://localhost:5001/api/tuntiraportti';
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
          yksileimaus: dataObj, 
          visible: "editform", 
          renderChildEdit: true
        })
      }
      handleClickDelete = (dataObj, event) => {
        //console.log:ssa voi konkatenoida tekstin ja datan pilkulla ja pitääkin, jos haluaa tulostaa objektin sisällön 
        console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan asiakkaan>>>>", dataObj); 
        alert("Poistan asiakkaan: " + dataObj.idleimaus); //Alertissa konkatenointi tehdään plussalla + 
        this.setState({
          poistaleimaus: dataObj, 
          visible: "deleteform", 
          renderChildDelete: true
        })
      }
     
      componentDidMount() {
        this.HaeNWRestApista();
      }
    
      render() {
        console.log("NWCustomerFetch-komponentti: render");
        let viesti = "NW Customers-rivejä:" + this.state.tunnit.length;
        let taulukko = [];
        //Luodaan taulukon otsikot
        let tHeaders=<tr><th></th><th>Leimaus ID</th><th>Sisään</th><th>Ulos</th><th>LuokkahuoneID</th></tr>;
        if (this.state.tunnit.length > 0) {
            for (let index = 0; index < this.state.tunnit.length; index++) {
                const element = this.state.tunnit[index];
                taulukko.push(<tr key={element.idleimaus}>
                <td><i className="fas fa-pencil-alt" onClick={this.handleClickEdit.bind(this, element)}></i></td>
                <td>{element.idleimaus}</td>
                <td>{element.sisaan}</td>
                <td>{element.ulos}</td>
                <td>{element.oppilasid}</td>
                <td>{element.luokkahuoneId}</td>
                <td><i className="fas fa-trash-alt" onClick={this.handleClickDelete.bind(this, element)}></i></td>
                </tr>);
          }
        }
        else {
          viesti = "Ladataan tietoja Northwind-tietokannasta... ei löydy"
        }
        //Ehdollinen return
        if (this.state.visible==="table") {
          return (<div className="box4 kello_page">
            <h1 className="text-center">Tietokantahaku tunnit</h1>
            <button onClick={this.handleClickHelp}>Näytä opaste</button>
            <button onClick={this.handleClickAdd}>Lisää leimaus</button>
            <Table responsive="sm" className="table table-dark" id="t01">
                  <thead>{tHeaders}</thead>
                  <tbody>{taulukko}</tbody>
                </Table>
                <button  onClick={this.handleClickPrev}><i className="fas fa-angle-double-left"> Edelliset</i></button>
                <button  onClick={this.handleClickNext}>Seuraavat <i className="fas fa-angle-double-right"></i></button>
            <p>{viesti}</p>
          </div>
        );
        } else if (this.state.visible==="addform") {
          return (<div className="box4 kello_page">
            <h1>Uuden asiakkaan lisäys</h1>
            <div>
              
              <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
            </div>
            {this.state.renderChildAdd ? <LeimausAdd unmountMe={this.handleChildUnmountAdd} /> : null }
          </div>
          );
    
        } else if (this.state.visible==="editform") {
          return (<div className="box4">
            <h1>leimaustietojen muokkaus</h1>
            <div>
              <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
            </div>
            {/* {this.state.renderChildEdit ? <NWCustomerEdit leimausObj={this.state.yksileimaus} unmountMe={this.handleChildUnmountEdit} /> : null } */}
          </div>
          );
    
        } else if (this.state.visible==="deleteform") {
          return (<div className="box4">
            <h1>leimaustietojen poiston vahvistus</h1>
            <div>
              <button onClick={this.handleClickHelp}>Näytä opaste</button>
              <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
            </div>
            {/* {this.state.renderChildDelete ? <NWCustomerDelete leimausObj={this.state.poistaleimaus} unmountMe={this.handleChildUnmountDelete} /> : null } */}
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
export default Tuntiraportti;