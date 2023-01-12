import React, {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import logo from './logo.svg';
import './App.css';

function App() {

  const [nombre,setNombre]=useState("Codigo");
  const cambiarNombre=(e)=>{
    const value= e.target.value
    console.log(value)
    setNombre(value);
  }

  const guardarClick=()=>{
    console.log("Esta es mi estado:",nombre);
  };


  return (

    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Cargar un libro</h1>
      <label>Nombre del libro:</label>
      
      <InputText id="nombre" name="nombre" value={nombre} onChange={cambiarNombre}></InputText>
      <button onClick={guardarClick}>Guardar</button>
      <input type="file" id="subir"  name="PDF"></input>
    </div>
  );
}

export default App;
