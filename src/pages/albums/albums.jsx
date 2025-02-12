// material-ui
import { Card, Grid, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { textAlign } from '@mui/system';
import fetchGetData, { fetchDataWithAuth } from 'client/client';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const brightColors = [
  '#E2F6A1',
  '#76997D',
  '#BF9AB3',
  '#E6F888',
  '#EBDAFC',
  '#7CDC91',
  '#DD6ABB',
  '#FCF6F5',
  '#D0ECA4',
  '#CDBBF5',
  '#BDFAD7',
  '#ACCAA0',
  '#D298D8',
  '#90E1DA',
  '#F1A4FA',
  '#B56DFC',
  '#BE78C2',
  '#689B98',
  '#86D272',
  '#C3EE7F'
];

function getRandomColor() {
  const randNum = Math.floor(Math.random() * brightColors.length);
  return brightColors[randNum];
}

const useStyles = makeStyles((theme) => ({
  Card: {
    backgroundColor: getRandomColor(),
    textAlign: 'center',
    padding: theme.spacing(),
    borderRadius: theme.spacing(2),
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

export default function Albums() {
  const [hasData, setHAsData] = useState();
  const [dataArray, setDataArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
     
      return;
    }

    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const uri = '/album/albums';
    try {
      const allAlbum = await fetchDataWithAuth(uri);
      setDataArray(allAlbum.data);
      setHAsData(true);
    } catch (error) {
      setHAsData(false);
      console.log(error);
    }
  };
  const classes = useStyles();
  return (
    <>
      {hasData ? (
        <Grid container spacing={2}>
          {dataArray.map((data, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/show-photos?id=${data.id}`} >
                  <Card>
                    <CardContent className={classes.card} style={{ backgroundColor: getRandomColor() }}>
                      <h1 style={{ fontSize: '2rem', margin: 0, color: 'white' , textTransform: "capitalize"  , listStyle: "none" , listStyleType: "none"} }>{data.name}</h1>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h1> Token Expired... Please Login Again </h1>
      )}
    </>
  );
}
