import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/home/context/auth-context";
import Modal from "../../shared/components/UIElements/Modal";
import {
  DeleteButton,
  CancelButton,
} from "../../shared/components/UIElements/Modal.styled";

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
  const [active, setActive] = useState(false);
  const auth = useContext(AuthContext);

  if (props.age) {
    return (
      <Card
        sx={{ maxWidth: 700, margin: "auto", marginTop: 2, marginBottom: 2 }}
      >
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
          {!auth.isLoggedIn && <Button size="medium">Connect</Button>}

          {!auth.isLoggedIn && (
            <Button
              href={`https://en.wikipedia.org/wiki/${props.breed}`}
              size="medium"
            >
              Learn More
            </Button>
          )}
          {auth.isLoggedIn && (
            <Link to={`/dogs/edit/${props.id}`}>
              <Button size="large">Edit</Button>
            </Link>
          )}
          {auth.isLoggedIn && (
            <div>
              <Button size="large" onClick={() => setActive(true)}>
                DELETE
              </Button>
              <Modal
                active={active}
                hideModal={() => setActive(false)}
                title="Are you sure?"
                cancelButton={<CancelButton>Cancel</CancelButton>}
                deleteButton={<DeleteButton>Delete</DeleteButton>}
              >
                Do you really want to delete {props.name}? This process
                cannot be undone.
              </Modal>
            </div>
          )}
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
