import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


const fetchGetData = (uri) => {
    const apiUrl = `${BASE_URL}${uri}`;
    
    return axios.get(apiUrl).catch(error => {
        console.log("Error in Fetching Data in url - " + apiUrl + " Message -" + error.message);
        throw error;
    });
}

const fetchPostData = (uri , payload)=> {
    const apiUrl = `${BASE_URL}${uri}`;

return axios.post(apiUrl , payload).catch(error => {
    console.log("Error in Fetching Data in url - " + apiUrl + " Message -" + error.message );
    throw error;
})

}

const fetchPostWithAuth =(uri , payload)=> {
    const apiUrl = `${BASE_URL}${uri}`;
const token = localStorage.getItem("token")


    axios.post(apiUrl , payload , {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    }).catch(error => {
        console.log("Error in Data Fetching ..." + apiUrl + " Error " + error.message);
        console.log(error);
        
        throw error;
    })
}

const fetchDataWithAuth =  async (uri)=> {
    const apiUrl = `${BASE_URL}${uri}`;
const token = localStorage.getItem("token");
try {
    let response = await axios.get(apiUrl , {
        headers: {
           "Authorization": `Bearer ${token}`
        }
    })

    return response;
} catch (error) {
    console.log(error);
    throw error;
    
}
}


const fetchUploadPhoto =async  (uri , payload)=> {
    const apiUrl = `${BASE_URL}${uri}`;
    const token = localStorage.getItem("token");
try {
    const response = await axios.post(apiUrl , payload , {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    } )

    return response;
} catch (error) {
    console.log(error);
    
    console.log("Error in Upload Api:- " + error);
}

}

const fetchGetDataWithArrayBuffer =  async (uri)=> {
    const token = localStorage.getItem("token");
    const apiUrl = `${BASE_URL}${uri}`;

    try {
        let response = await   axios.get(apiUrl ,   {
            headers: {
         
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
    
        })
    
        return response;
    } catch (error) {
        console.log(error);
        
    }

}


const fetchDeleteWithAuth = async (uri)=> {
    const token = localStorage.getItem("token");
    const apiUrl = `${BASE_URL}${uri}`;

    try {
        let deleteData = await axios.delete(apiUrl , {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
        return deleteData
    } catch (error) {
        console.log(error);
        
    }
}


const fetchGetDataDownloadBlob =  async (uri)=> {
    const token = localStorage.getItem("token");
    const apiUrl = `${BASE_URL}${uri}`;

    try {
        let response = await   axios.get(apiUrl ,   {
            headers: {
         
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
    
        })
    
        return response;
    } catch (error) {
        console.log(error);
        
    }

}

export default fetchGetData;

export {fetchPostData  , fetchPostWithAuth , fetchDataWithAuth , fetchUploadPhoto , fetchGetDataWithArrayBuffer , fetchDeleteWithAuth , fetchGetDataDownloadBlob };
