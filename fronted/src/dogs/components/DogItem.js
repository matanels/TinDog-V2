import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import "./DogItem.css";

const DogItem = (props) => {
  if (props.age) {
    return (
      <Card sx={{ maxWidth: 700, margin: "auto", marginTop: 2 }}>
        <CardMedia
          component="img"
          height="550"
          image={props.image}
          alt={props.name}
        />
        <CardContent>
          <Typography
            fontFamily="Helvetica Neue"
            gutterBottom
            variant="h3"
            component="div"
            textAlign="center"
          >
            {props.name}
          </Typography>
          <Typography
            fontFamily="-apple-system"
            variant="h4"
            component="div"
            textAlign="center"
          >
            {props.breed}
          </Typography>
          <Typography
            fontFamily="-apple-system"
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Age: {props.age}
          </Typography>
          <Typography
            fontFamily="-apple-system"
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            From: {props.from}
          </Typography>
          <Typography
            fontFamily="-apple-system"
            variant="h5"
            component="div"
            textAlign="center"
          >
            Gender: {props.gender}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="medium">Connect</Button>
          <Button
            href={`https://en.wikipedia.org/wiki/${props.breed}`}
            size="medium"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
  return (
    <div className="dog-card">
      <Link to={`/dogs/${props.id}`}>
        <div className="dog-img-div">
          <img src={props.image} alt={props.name} className="dog-img"></img>
        </div>
        <div className="dog-content">
          <h1>{props.name}</h1>
          <h3>{props.breed}</h3>
          <h3>{props.gender}</h3>
        </div>
      </Link>
    </div>
  );
};

export default DogItem;
