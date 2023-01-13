import React, {useState, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const UserProfiles=()=>{
  const fetchUserPfroile=()=>{
    axios.get('http://localhost:8080/api/asset/get-object?key=').then(res=>{
      console.log(res)
    });
  }

  useEffect(()=>{
    fetchUserPfroile();
  }, []);
  return <h1>Hello</h1>;
};

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

      <UserProfiles/>

    </div>
  );
}

export default App;
