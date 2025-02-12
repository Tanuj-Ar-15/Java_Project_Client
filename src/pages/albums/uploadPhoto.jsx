import { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Header from './comp/Header';
import { useLocation, useNavigate } from 'react-router';
import { fetchUploadPhoto } from 'client/client';
import {CircularProgress }from '@mui/material';


const PhotoUpload = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [message , setMessage] = useState("");
  const [processing , setProcessing] = useState(false)
  let navigate = useNavigate()
  let location = useLocation()
  let queryParam = new URLSearchParams(location.search)
  const id = queryParam.get("id");

  // Handle file drop
  const handleDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  // Remove a file from the list
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle submit
  const handleSubmit =  async () => {
    let formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });





    const uri = `/album/${id}/photos`
     try {
        
setProcessing(true)
        let uploadPhoto = await fetchUploadPhoto(uri , formData)
        setFiles([])
        setMessage("Photo Uploaded Successfully!");

        setTimeout(()=> {
navigate(`/show-photos?id=${id}`)
        } , 1000)
    } catch (error) {
        setMessage("")
        console.log("Error in file upload file" , error);
        
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: handleDrop,
    multiple: true
  });

  return (
    <>
      <Header />

      <Box sx={{ marginTop: '20px' }}>
        <Paper
          elevation={3}
          {...getRootProps()}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed #799edc',
            borderRadius: 2,
            backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
            cursor: 'pointer'
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6" color="textSecondary">
            {isDragActive ? 'Drop the files here...' : 'Drag & Drop photos here or click to select'}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Browse Files
          </Button>
        </Paper>

        {files.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" color="textPrimary">
              Preview:
            </Typography>
            <Grid container spacing={2}>
              {files.map((file, index) => (
                <Grid item key={index} xs={6} sm={4} md={3} position="relative">
                  <Paper elevation={3} sx={{ p: 1, position: 'relative' }}>
            
                    <button
                      style={{
                        backgroundColor: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        color: 'red',
                        zIndex: '5'
                      }}
                      onClick={() => handleRemoveFile(index)}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>

                

                    <img
                      src={file.preview}
                      alt={file.name}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                      {file.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

<Grid item xs={12} >
{
    processing && <Box textAlign={"center"}>
<CircularProgress/>
        <Typography variant='body2' color={"textSecondary"} marginTop={"10px"} >
Uploading ... 
        </Typography>
    </Box>
}


</Grid>

            <Box mt={3} textAlign="center">
              <Button variant="contained" color="success" onClick={handleSubmit} sx={{ px: 4, py: 1, fontSize: '1rem' }}>
                Submit Photos
              </Button>
            </Box>
          </Box>
        )}

        {message && <p  style={{color: "green"}} > {message} </p>}
      </Box>
    </>
  );
};

export default PhotoUpload;
