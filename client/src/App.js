// client/src/App.js

import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper, Card, Input, ListSubheader, List, ListItem, Container } from "@material-ui/core"
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  grid: {
    width: '100%',
    margin: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
  detail: {
    padding: theme.spacing(1),
    marginTop: '2px',
    textAlign: 'center',
  },
  listSubheader: {
    textAlign: 'center',
  },
  list: {

  }
}));

function App() {
  const [data, setData] = React.useState(null);
  const classes = useStyles();
  const [userInput, setUserInput] = React.useState("...");
  const [transformedOutput, setT9] = React.useState([]);

  React.useEffect(() => {

  }, [transformedOutput]);


  const onClick = (e) => {
    e.preventDefault();

    var value = userInput;
    if (value == "...") value = "";
    setUserInput(value + (value.length > 0 ? "," : "") + e.target.innerHTML);
  }

  const clear = (e) => {
    e.preventDefault();
    setUserInput("...");
    setT9([]);
  }

  const transform = (input) => {
    try {
      const format = input.replaceAll(",", "#");
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: format })
      };

      fetch("http://localhost:3001/api", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setT9(data.split("/"));
        });
    } catch (er) {
      console.log(er);
    }
  }


  return (
    <Card className={classes.card}>
      <ListSubheader className={classes.listSubheader}>{userInput}</ListSubheader>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={4} >
          <Paper className={classes.paper} onClick={onClick} >1</Paper>
          <Paper className={classes.detail}>~</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>2</Paper>
          <Paper className={classes.detail}>abc</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>3</Paper>
          <Paper className={classes.detail}>def</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>4</Paper>
          <Paper className={classes.detail}>ghi</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>5</Paper>
          <Paper className={classes.detail}>jkl</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>6</Paper>
          <Paper className={classes.detail}>mno</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>7</Paper>
          <Paper className={classes.detail}>pqrs</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>8</Paper>
          <Paper className={classes.detail}>tuv</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>9</Paper>
          <Paper className={classes.detail}>wxyz</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={clear}>C</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={onClick}>0</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} onClick={() => transform(userInput)}>T9</Paper>
        </Grid>
        {transformedOutput.length > 0 == true &&
          <Container className={classes.list} >
            <List style={{ maxHeight: '40%', overflow: 'auto', backgroundColor: 'grey' }}>
              {transformedOutput.map((item, ind) => (
                <ListItem
                  key={`menu_${ind}_element_${ind}`}
                >{item}</ListItem>
              ))}
            </List>
          </Container>
        }
      </Grid>
    </Card >
  );
}

export default App;