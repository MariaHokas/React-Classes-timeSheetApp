import React, { Component } from 'react';
import './App.css';


class LeimausAdd extends Component {
    constructor(props) {
      super(props);
      this.state = {IDleimaus: '', LuokkahuoneID: '' };
      this.handleChangeIDleimaus = this.handleChangeIDleimaus.bind(this);
      this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWCustomerAdd -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    } 

    handleChangeIDleimaus(event) { 
        var syöte = event.target.value;
        this.setState({...this.state,IDleimaus: syöte.toUpperCase()});
    }
    handleChangeLuokkahuoneID(event) {
        var syöte = event.target.value;
        this.setState({...this.state,LuokkahuoneID: syöte});
    }

    handleSubmit(event) {
        alert('Lähetettiin leimaus: ' + this.state.Idleimaus);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan leimausobjekti, johon haetaan state:sta tiedot                     
       const tunnit = {
                    IDleimaus: this.state.Idleimaus,
                    //    Sisaan: this.state.Sisaan,
                    //    Ulos: this.state.Ulos,
                    //    OppilasID: this.state.OppilasID,
                       LuokkahuoneID: this.state.LuokkahuoneID};
                       
       // send an asynchronous request to the backend
       const tunnitJson = JSON.stringify(tunnit);
       console.log("tunnitJson = " + tunnitJson);
       const apiUrl= 'https://localhost:5001/api/tuntiraportti';
    //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/customer';
       fetch(apiUrl, {
           method: "POST",
           headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
           },
           body: tunnitJson
       }).then((response) => response.json())
           .then((json) => {
               // store the data returned from the backend to the current state
               const success = json;
               console.log(`Response from server: ${success}.`);
               if (success) {
                  console.log("Pyyntö asiakkaan tallettamiseksi tehty -- -- -- -- --");
                  this.dismiss();
               }
           });
   }

    render() {
        return (
        <form className="box3" onSubmit={this.handleSubmit}>        
            {/* <input type="text" title="Syötä leimaustunnus" placeholder="IDleimaus" onChange={this.handleChangeIDleimaus} />     */}
            {/* <input type="text" placeholder="Sisaan" onChange={this.handleChangeSisaan} />  
            <input type="text" placeholder="Ulos" onChange={this.handleChangeUlos} />    
            <input type="text" placeholder="OppilasID" onChange={this.handleChangeOppilasID} />    */}
            <input type="text" placeholder="LuokkahuoneID" onChange={this.handleChangeLuokkahuoneID} />    
            <br/>
            <button type="submit">Tallenna uudet tiedot</button> 
        </form>
        );
    }
}
export default LeimausAdd;