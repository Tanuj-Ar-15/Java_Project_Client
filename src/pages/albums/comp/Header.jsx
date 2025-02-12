import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { fetchDeleteWithAuth } from 'client/client';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Header() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const navigate = useNavigate();
  const handleDeleteAlbum = () => {

    console.log("clicked");
    
    const url = `/album/delete/${id}/album`;
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
         await fetchDeleteWithAuth(url);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Album has been deleted.',
          icon: 'success',
          timer: 1000
        });
        navigate('/');
      }
    });
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>

        <Button
          component={Link}
          to={`/edit-album?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#799edc', '&:hover': { backgroundColor: '#2f6ad0' } }}
        >
          Edit Album
        </Button>
        <Button
          component={Link}
          to={`/upload-photos?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#4cae00' } }}
        >
          Upload Photos
        </Button>
        <Button
          onClick={handleDeleteAlbum}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
        >
          Delete Album
        </Button>
      </Toolbar>
    </AppBar>
  );
}
