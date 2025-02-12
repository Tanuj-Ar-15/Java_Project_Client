import { Card, CardMedia, CardContent, Grid, Tooltip, IconButton, ButtonGroup, Typography, Box , Button } from '@mui/material';
import { fetchDataWithAuth, fetchDeleteWithAuth, fetchGetDataDownloadBlob, fetchGetDataWithArrayBuffer } from 'client/client';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Buffer } from 'buffer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Modal} from '@mui/material';



const PhotoGrid = () => {
  const [photos, setPhotos] = useState({});
  const [albumName, setAlbumName] = useState();
  const [open, setOpen] = useState(false);
  const [modalData, setmodalData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');


  const displayCard = async () => {
    const apiUrl = `/album/all/${id}`;
    let albumList = await fetchDataWithAuth(apiUrl);
    console.log(albumList);

    setAlbumName(albumList.data[0].name);
    albumList.data[0].photoDtos.forEach(async (photo) => {
      const result = await fetchGetDataWithArrayBuffer(`/album${photo.link}`);
      const albumPhotoId = `album_${id}_photo${photo.id}`;
      console.log(result);

      const buffer = Buffer.from(result.data, 'binary').toString('base64');
      console.log(photo);

      const temp = {
        album_id: id,
        photo_id: photo.id,
        name: photo.finalFileName,
        content: buffer,
        download: photo.link
      };

      setPhotos((prevPhotos) => ({ ...prevPhotos, [albumPhotoId]: temp }));
    });
  };

  useEffect(() => {
    displayCard();
  }, [id]);

  const handleView = (photo) => {
    setmodalData(photo);
    setOpen(true)
  };

  const handleDelete = (photoId) => {
    const url = `/album/delete/${id}/photo/${photoId}`;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchDeleteWithAuth(url);

        if (response.data.confirmation) {
          setPhotos((prevPhotos) => {
            let updatedPhotos = { ...prevPhotos };
            delete updatedPhotos[`album_${response.data.album_id}_photo${response.data.photo_id}`];
            return updatedPhotos;
          });
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            timer: 1000
          });
        }
      }
    });
  };
  // This is the api download file by calling the java Api
  // handleDownloadApi(photo.download, photo.name) for calling with download button.
  const handleDownloadApi = async (photoLink, photoName) => {
    const response = await fetchGetDataDownloadBlob(`/album${photoLink}`);

    const fileName = photoName ? photoName : 'downloadFile';
    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  };

  // This is non Api download function using photo object content

  const handleDownload = (photo) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${photo.content}`;
    link.download = `${photo.name}.jpg`;
    document.body.appendChild(link);
    link.click();


    console.log("downloaded");
    
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, textTransform: 'capitalize' }}>
        {' '}
        {albumName}{' '}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '40px' }}>
        {Object.keys(photos).map((cardKey) => {
          const photo = photos[cardKey];

          return (
            <Grid item key={photo.photo_id} xs={8} sm={4} md={4} lg={2}>
              <Card>
                <Tooltip title={photo.name}>
                  <CardMedia
                    component={'img'}
                    height={'200'}
                    sx={{ marginLeft: '15px' }}
                    image={`data:image/jpeg;base64,${photo.content}`}
                    alt={photo.name}
                  />
                </Tooltip>
                <CardContent>
                  <ButtonGroup fullWidth>
                    <Tooltip title="View">
                      <IconButton color="primary" onClick={() => handleView(photo)}>
                        <FontAwesomeIcon icon={faEye} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(photo.photo_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton color="success" onClick={() => handleDownload(photo)}>
                        <FontAwesomeIcon icon={faDownload} />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${modalData.content}`}
            alt={modalData.name}
            style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
          />
                <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => handleDownload(modalData)}
          >
            Download
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)} fullWidth>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PhotoGrid;
