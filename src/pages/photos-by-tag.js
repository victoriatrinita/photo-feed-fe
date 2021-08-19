import React, { useEffect, useState } from "react";
import { getPhotosByTag } from "../api";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import { usePhotoContext } from "../context/PhotoContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "90%",
    height: "100%",
  },
  image: {
    width: "100%",
  },
  media: {
    height: 250,
    width: "100%",
    objectFit: "cover",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const PhotoCard = ({
  id,
  title,
  description,
  date_taken,
  media,
  tags,
  rating,
  link,
  author,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs md={3} sm={4}>
      <Paper className={classes.paper}>
        <ButtonBase className={classes.image} href={link}>
          <img className={classes.media} alt="" src={media.m} />
        </ButtonBase>
        <Typography gutterBottom variant="h6" noWrap>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Genre: {rating}
        </Typography>
        <Typography variant="subtitle1" gutterBottom noWrap>
          tags:{" "}
          {!!tags
            ? tags.split(" ").map((el) => (
                <Button
                  style={{ marginRight: "20px" }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  {el}
                </Button>
              ))
            : ""}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Rating: {date_taken}
        </Typography>
        <Typography variant="body2" color="textSecondary"></Typography>
      </Paper>
    </Grid>
  );
};

const PhotosGrid = () => {
  let history = useHistory();
  let { tags } = useParams();
  const [search, setSearch] = useState("");
  const [state, setPhotos] = usePhotoContext();

  useEffect(() => {
    getPhotosByTag(tags)
      .then((res) => {
        setPhotos({
          ...state,
          photos: res.data.response,
        });
      });
  }, [tags]);

  const keyPressHandler = (e) => {
    if (e.which === 13 && !!search) {
      history.push("/" + search);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography
          align="center"
          variant="h4"
          color="primary"
          style={{ marginTop: "20px" }}
          gutterBottom
        >
          Photo Feed
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <Paper
            component="form"
            style={{
              marginRight: "10px",
            }}
          >
            <InputBase
              className={classes.input}
              defaultValue={tags}
              onChange={handleSearch}
              placeholder="Search Photo"
              inputProps={{ "aria-label": "search photo" }}
              onKeyDown={keyPressHandler}
            />
          </Paper>
          <RouterLink style={{ textDecoration: "none" }} to={`/${search}`}>
            <Button
              style={{ marginRight: "20px" }}
              variant="contained"
              size="small"
              color="primary"
            >
              Search
            </Button>
          </RouterLink>
        </div>

        <Grid container spacing={2}>
          {state.photos.map((photo, index) => (
            <PhotoCard key={photo.id + index} {...photo} />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default PhotosGrid;
