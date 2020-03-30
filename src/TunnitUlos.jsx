import React, { Component } from 'react';
import './App.css';


class TunnitSisaan extends Component {
    constructor(props) {
        super(props);
        this.state = { TunnitID: '', LuokkahuoneID: '', OppilasID: ''};
        this.handleChangeTunnitID = this.handleChangeTunnitID.bind(this);
        this.handleChangeLuokkahuoneID = this.handleChangeLuokkahuoneID.bind(this);
        this.handleChangeOppilasID = this.handleChangeOppilasID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        alert('Lähetettiin tunnit: ' + this.state.LuokkahuoneID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
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
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Luokkahuone" onChange={this.handleChangeLuokkahuoneID} />
                    <input type="text" placeholder="OppilasID" onChange={this.handleChangeOppilasID} />                    
                    <br />               
                    <button className="btn-circle" type="submit">Ulos</button>
                </form>
            </div>
        );
    }
}
export default TunnitSisaan;