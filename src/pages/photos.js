import React, { useEffect, useState } from "react";
import { getPhotos } from "../api";
import { usePhotoContext } from "../context/PhotoContext";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 1,
  },
  grid: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    height: "100%",
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
  published,
  link,
  author,
}) => {
  const classes = useStyles();

  return (
    <a href={link} style={{ textDecoration: "none" }}>
      <Paper className={classes.paper}>
        <img className={classes.media} alt="" src={media.m} />
        <Typography gutterBottom variant="h6" noWrap>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Captured on {date_taken.substring(0, date_taken.indexOf("T"))} by{" "}
          {author.match(/(?<=")(.*?)(?=")/g)}
        </Typography>
        <Typography variant="subtitle1" gutterBottom noWrap>
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
          Published on {published.substring(0, published.indexOf("T"))}
        </Typography>
        <Typography variant="body2" color="textSecondary"></Typography>
      </Paper>
    </a>
  );
};

const PhotosGrid = () => {
  let history = useHistory();
  const [search, setSearch] = useState("");
  const [state, setPhotos] = usePhotoContext();

  useEffect(() => {
    getPhotos().then((res) => {
      if (res.data) {
        setPhotos({
          ...state,
          photos: res.data.response,
        });
      }
    });
  }, []);

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
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          className={classes.grid}
        >
          {state.photos.map((photo, index) => (
            <Grid item xs={12} md={3} sm={4}>
              <PhotoCard key={photo.id + index} {...photo} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default PhotosGrid;
