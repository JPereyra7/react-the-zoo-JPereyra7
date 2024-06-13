import axios from "axios";
import { useEffect, useState } from "react"
import { IDjur } from "../models/IDjur";

export const DjurLista = () => {
    const [djur, setDjur] = useState<IDjur[]>([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("https://animals.azurewebsites.net/api/animals");
                setDjur(response.data);
                localStorage.setItem('djur', JSON.stringify(response.data));
            } catch (e) {
                console.error("Failed to retrieve data", e);
            }
        }
        getData();
    }, []);

    return(
        <>
         <div>
            <ul>{djur.map((djuren, index)=> (
                <li key={index}>
                    <h1>{djuren.name}</h1>
                    <h2>{djuren.yearOfBirth}</h2>
                    <img 
                    src={djuren.imageUrl} 
                    alt=""
                    className="imageContainer" />
                </li>
            ))}</ul>
         </div>
        </>
    )
}

