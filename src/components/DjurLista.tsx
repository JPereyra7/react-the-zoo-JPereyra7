import axios from "axios";
import { useEffect, useState } from "react";
import { IDjur } from "../models/IDjur";
import { useNavigate } from "react-router-dom";
import "../styles/DjurLista.css";

export const DjurLista = () => {
  const navigate = useNavigate();

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

  const individuelltDjur = (animalId: number) => {
    navigate(`/djuren/${animalId}`);
  }

  return (
    <div className="djurContainer">
      <ul className="ulContainer">
        {djur.map((djuren, index) => (
          <li
            onClick={() => individuelltDjur(djuren.id)}
            key={index}
            className="djurItem"
          >
            <h3>{djuren.name}</h3>
            {/* <h3>{djuren.yearOfBirth}</h3> */}
            <img
              src={djuren.imageUrl}
              alt=""
              className="imageContainer"
            />
            <p className="paragrafContainer">{djuren.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
