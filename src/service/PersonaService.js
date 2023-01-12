import axios from "axios";

export class PersonaService{
    baseUrl = "http://localhost:8080/api"
    getAll(){
        return axios.get('')
    }
}