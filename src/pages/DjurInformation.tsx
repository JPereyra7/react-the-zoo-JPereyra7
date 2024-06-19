import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDjur } from "../models/IDjur";
import axios from "axios";
import "../styles/DjurInformation.css"

export const DjurInformation = () => {
  const { id } = useParams();
  const [djur, setDjur] = useState<IDjur>();
  const [aptit, setAptit] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const localDjur = localStorage.getItem(`djur${id}`);
        if (localDjur) {
          setDjur(JSON.parse(localDjur));
        } else {
          const response = await axios.get(`https://animals.azurewebsites.net/api/animals/${id}`);
          setDjur(response.data);
          localStorage.setItem(`djur${id}`, JSON.stringify(response.data));
        }
      } catch (e) {
        console.error("Failed to retrieve data", e);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    if (djur && djur.lastFed) {
      const calculateAptit = () => {
        const sistMatadDatum = new Date(djur.lastFed).getTime();
        const nuvarandeTid = new Date().getTime();
        const tidsSkillnad = nuvarandeTid - sistMatadDatum;
        const timmarsSkillnad = tidsSkillnad / (1000 * 60 * 60); // Millisekunder till timmar!

        if (timmarsSkillnad < 4) {
          setAptit('mätt');
        } else if (timmarsSkillnad >= 4 && timmarsSkillnad < 8) {
          setAptit('lite hungrig');
        } else {
          setAptit('jättehungrig');
        }
      };
      calculateAptit();
    }
  }, [djur]);

  const mataKnapp = () => {
    if (djur) {
      const uppdateratDjur = {
        ...djur,
        isFed: true,
        lastFed: new Date().toISOString(),
      };
      setDjur(uppdateratDjur);
      localStorage.setItem(`djur${id}`, JSON.stringify(uppdateratDjur));
      console.log("Matad");
    }
  };

  return (
    <>
    <div className="djurContainer">
      <h2>{`Du valde lille ${djur?.name}`}</h2>
      <h3>{djur?.name}</h3>
      <h3>{`Född: ${djur?.yearOfBirth}`}</h3>
      <img 
        src={djur?.imageUrl} 
        alt={djur?.name} 
        className="imageContainer" 
      />
      <p className="paragraphContainer">{djur?.longDescription}</p>
      <p>{`Senast matad: ${djur?.lastFed}`}</p>
      <button onClick={mataKnapp} disabled={aptit === 'mätt'}>{`Mata ${djur?.name}`}</button>
      <p>{`${djur?.name} är ${aptit}`}</p>
      </div>
    </>
  );
};