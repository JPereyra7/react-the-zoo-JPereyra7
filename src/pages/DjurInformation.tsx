import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IDjur } from "../models/IDjur";
import axios from "axios";

export const DjurInformation = () => {
const { id } = useParams();
const [djur, setDjur] = useState<IDjur>();

useEffect(() => {

    const getData = async () => {
        try {
            const response = await axios.get(`https://animals.azurewebsites.net/api/animals/${id}`);
            setDjur(response.data);
            localStorage.setItem('djur', JSON.stringify(response.data));
        } catch (e) {
            console.error("Failed to retrieve data", e);
        }
    }
    getData();
}, [id]);



    return(
        <>
        <h2>{`Du valde lille ${djur?.name}`}</h2>
        <h2>{djur?.name}</h2>
        <h2>{djur?.yearOfBirth}</h2>
        <img 
        src={djur?.imageUrl} 
        alt=""
        className="imageContainer" />
        </>
    )
}