import macawHeroImage from "../assets/macawhero.png";
import "../styles/Hem.css";

export const Hem = () => {

    return(
        <>
        <h2 className="titelContainer">Zoo, en plats för glädje, och äventyr!</h2>
        <div className="heroBodyContainer">
        <img 
        src={macawHeroImage} 
        alt=""
        className="macawBild" />
        </div>
        </>
    )
}