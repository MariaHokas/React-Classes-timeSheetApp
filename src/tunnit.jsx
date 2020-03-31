import React, { Component } from 'react';
import './App.css';
import TunnitLeimaus from './TunnitLeimaus';


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
    }

    render() {
   //Ehdollinen return
      
            return (<div className="box4">
                <h1 className="text-center">Sisään leimaus</h1>
                <TunnitLeimaus unmountMe={this.handleChildUnmountleimaus} />
         
        
                <h1 className="text-center">Täällä ollaan</h1>
                <div>
                </div>

            </div>

            );
        } 
    }
export default Tunnit;