import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiClockTimeFourOutline, mdiShoePrint } from "@mdi/js";

import NoImage from "../PlaceholderImages/no-image.jpg"

function RecipeCard({title, description, photo, steps, time}) {
    return (
        <Card className="bg-dark text-white border-0">
            <Card.Img src={photo ? photo : NoImage} alt="Card image" />
            <Card.ImgOverlay className="d-flex flex-column align-items-start recipe-img-overlay">
                <div style={{width: "100%"}}>
                    <Card.Text style={{textAlign: "right"}}><Icon path={mdiShoePrint} size={1} /> {steps} <Icon path={mdiClockTimeFourOutline} size={1} /> {time} min</Card.Text>
                </div>
                <div className="mt-auto">
                    <Card.Title >{title}</Card.Title>
                    <Card.Text className="mt-auto d-sm-block">
                    {description}
                    </Card.Text>
                </div>
            </Card.ImgOverlay>
        </Card>
    );
}

export default RecipeCard;