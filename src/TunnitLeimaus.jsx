import React, { Component } from 'react';
import './App.css';


class Tunnitleimaus extends Component {
    constructor(props) {
        super(props);
        this.state = { TunnitID: '', LuokkahuoneID: '', OppilasID: ''};
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeOppilasID = this.handleChangeOppilasID.bind(this);
        this.handleSubmitSisaan = this.handleSubmitSisaan.bind(this);
        this.handleSubmitUlos = this.handleSubmitUlos.bind(this);
    }

    dismiss() {
        console.log("Ollaan TunnitSisaan -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeTunnitID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, TunnitID: syöte.toUpperCase() });
    }
    handleChangeLuokkahuoneID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, LuokkahuoneID: syöte });
    }
    handleChangeOppilasID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, OppilasID: syöte });
    }

    handleSubmitSisaan(event) {
        alert('Lähetettiin tunnit: ' + this.state.LuokkahuoneID);
        event.preventDefault();
        this.Sisaan();
    }
    handleSubmitUlos(event) {
        alert('Lähetettiin tunnit: ' + this.state.LuokkahuoneID);
        event.preventDefault();
        this.Ulos();
    }

    Sisaan() {
        // Luodaan tunnitobjekti, johon haetaan state:sta tiedot                     
        const tunnit = {
            TunnitID: this.state.TunnitId,
            LuokkahuoneID: this.state.LuokkahuoneID,
            OppilasID: this.state.OppilasID
        };

        // send an asynchronous request to the backend
        const tunnitJson = JSON.stringify(tunnit);
        console.log("tunnitJson = " + tunnitJson);
        const apiUrl= 'https://localhost:5001/api/tunnit/Sisaan';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
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
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    Ulos() {
        // Luodaan tunnitobjekti, johon haetaan state:sta tiedot                     
        const tunnit = {
            TunnitID: this.state.TunnitId,
            LuokkahuoneID: this.state.LuokkahuoneID,
            OppilasID: this.state.OppilasID
        };

        // send an asynchronous request to the backend
        const tunnitJson = JSON.stringify(tunnit);
        console.log("tunnitJson = " + tunnitJson);
        const apiUrl= 'https://localhost:5001/api/tunnit/ulos';
        //    const apiUrl= 'https://webapiharjoituskoodi20191128035915.azurewebsites.net/nw/logins';
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
                    console.log("Pyyntö tunnuksen tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render()
     {
        return (
            <div className="margin">
                <input type="text" placeholder="Luokkahuone" onChange={this.handleChangeLuokkahuoneID} />
                <input type="text" placeholder="OppilasID" onChange={this.handleChangeOppilasID} /> 
                <br/>
                <button onClick={this.handleSubmitSisaan} className="btn-circle" type="submit">Sisään</button>                                                             
                <button onClick={this.handleSubmitUlos} className="btn-circle" type="submit">Ulos</button>                                
            </div>
        );
    }
}
export default Tunnitleimaus;