import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const PhotoGrid = ({ photoArray }) => {
  const [photos, setPhotos] = useState(new Set());

  useEffect(() => {
    const addPhotoAsync = async (link) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPhotos((prevData) => new Set([...prevData, link]));
    };

const loadPhoto = async ()=> {
    for(let link of photoArray){
        await addPhotoAsync(link)
    }
}
loadPhoto()
  }, []);


 

  return (
    <>
      {}
      <Grid container spacing={2} sx={{ marginTop: '40px' }}>
        {[...photos].map((card) => {
          return (
            <Grid item key={card.id} xs={8} sm={4} md={4} lg={2}>
              <Card>
                <CardMedia component={'img'} height={'200'} sx={{ marginLeft: '15px' }} image={card.url} />

                <CardContent>
                  <Typography variant="subtitle1">{card.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PhotoGrid;
