import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import logo from './logo.svg';
import './App.css';


import axios from 'axios';




function App() {

  const [showConfirm, setShowConfirm] = useState(false);



  const [libro, setlibro] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    imagenPhat: "",
  })
  
  const { titulo, autor, descripcion, imagenPhat} = libro;
  
  const onInputChange = (e) => {
    setlibro({ ...libro, [e.target.name]: e.target.value });
  };
  
  
  const registrar = async (e) => {
    console.log("Holaaaa "+e);
    const f = new FormData();
  
    if (window.confirm('¿Toda la informacion esta correcta quiere subir un nuevo libro?')) {
      e.preventDefault();

  
      await axios.post("http://localhost:8080/api/cursos", libro)
      

        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      
    } else {
      console.log(libro)
    }
  
  }
  

 /* const [nombre, setNombre] = useState("Codigo");
  const cambiarNombre = (e) => {
    const value = e.target.value
    console.log(value)
    setNombre(value);
  }



  const guardarClick = () => {
    console.log("Esta es mi estado:", nombre);
    axios.post('http://localhost:8080/api/assets/upload?file')
  };*/

  const [archivos, setArchivos] = useState(null)
  const subirArchivos = e => {
    setArchivos(e);
    console.log(e);

  }
  const insertarArchivos = async () => {

    const f = new FormData();

    for (let index = 0; index < archivos.length; index++) {
      f.append("file", archivos[index]);

    }

    
    await axios.post("http://localhost:8080/api/assets/upload", f, { headers: { 'Content-Type': 'multipart/form-data' } })

      .then(response => {
        console.log(response.data);
        console.log(response.data.key)
        libro.imagenPhat = response.data.key
        
      }).catch(error => {
        console.log(error);
      })
  }
  return (

    <div className="App" style={{
      backgroundImage: `url("https://www.wallpapertip.com/wmimgs/81-810873_green-color-lightness-and-darkness-differs-single-color.jpg")`
    }}>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1 >Inventario de Libros</h1>
      <br></br><br></br>
      
      <label>Titulo del Libro:</label>&nbsp;&nbsp;&nbsp;
      <b-field expanded>
        <input class="input" name='titulo'
          placeholder="Titulo del libro" type="text" value={titulo}  onChange={(e) => onInputChange(e)}></input>
      </b-field><br></br><br></br>

      <label>Autor:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field expanded>
        <input class="input" name='autor'
          placeholder="Nombre del autor" type="text" value={autor} onChange={(e) => onInputChange(e)}></input>
      </b-field><br></br><br></br>

      <label>Descripción:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b-field expanded>
        <input class="input" name='descripcion'
          placeholder="Descripcion corta" type="text" value={descripcion}   onChange={(e) => onInputChange(e)}></input>
      </b-field><br></br><br></br>

      <input type="file" id="subir" name="PDF" onChange={(e) => subirArchivos(e.target.files)} /><br></br>
      <br></br><br></br>
      <Button variant="success" onClick={() => insertarArchivos()}>Agregar Libro</Button>{' '}
      <Button variant="success" onClick={(e) => registrar(e)}>Guardar Libro</Button>{' '}
      <br></br><br></br>
      <img src="https://cdn-icons-png.flaticon.com/512/3143/3143460.png" width={200} height={200}></img>

    </div>
  );
}

export default App;
