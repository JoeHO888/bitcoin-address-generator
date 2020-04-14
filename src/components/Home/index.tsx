import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { routes } from "../../routes";


const Home: React.FC = () => {
    const cardElements = [routes.hdSegWit, routes.multiSig];
    const cards = cardElements.map(
        (cardElement) => {
            return (
                <Card className="card">
                    <Link to={cardElement.route}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={cardElement.description}
                                image={cardElement.imagePath}
                                title={cardElement.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {cardElement.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h3">
                                {cardElement.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Card>
            )
        }
    )

    return (
        <div className="home">
            <h1>
                Bitcoin Address Generator
            </h1>
            {cards}
        </div>
    )
}

export { Home };