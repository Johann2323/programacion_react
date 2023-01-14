import React, {useState, useEffect, userCallback} from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const UserProfiles=()=>{
  const fetchUserPfroile=()=>{
    axios.get('http://localhost:8080/api/cursos').then(res=>{
      console.log(res)
    });
  }

  useEffect(()=>{
    fetchUserPfroile();
  }, []);
  return <h1>Hello</h1>;
};

/*CanvasCaptureMediaStreamTrackrchivo(event: any): any {
  const archivocapturado = event.target.files[0]
 // this.extraerBase64(archivocapturado).then((image: any) => {

   // console.log(image)
 // })


}*/

/*
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<FileInput />);
*/

function App() {
 
  const [nombre,setNombre]=useState("Codigo");
  const cambiarNombre=(e)=>{
    const value= e.target.value
    console.log(value)
    setNombre(value);
  }

  

  const guardarClick=()=>{
    console.log("Esta es mi estado:",nombre);
    axios.post('http://localhost:8080/api/assets/upload?file')
  };

  const [archivos, setArchivos]=useState(null)
  const subirArchivos =e=>{
    setArchivos(e);
    console.log(e);
    
  }
  const insertarArchivos=async()=>{

    const f = new FormData();

    for (let index = 0; index < archivos.length; index++) {
      f.append("file",archivos[index]);
      
    }

    console.log("Aqui "+f)
    await axios.post("http://localhost:8080/api/assets/upload", f,{headers:{'Content-Type':'multipart/form-data'}})
    
    .then(response =>{
      console.log(response.data);
      console.log(f)
    }).catch(error=>{
      console.log(error);
    })
  }
  return (

    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Cargar un libro</h1>
      <label>Nombre del libro:</label>
      
      <InputText id="nombre" name="nombre" value={nombre} onChange={cambiarNombre}></InputText>
      <button onClick={guardarClick}>Guardar</button>
      <input type="file" id="subir" name="PDF" onChange={(e)=>subirArchivos(e.target.files)}/>
      <button onClick={()=>insertarArchivos()}>Guardar Libro</button>

  
      

    </div>
  );
}

export default App;
