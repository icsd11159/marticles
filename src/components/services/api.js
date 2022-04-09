import axios from "axios";

  /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
  export const getArticles = ( resource) => {
    console.log("resource");
    console.log(resource);
 

  return(
    axios.post('http://localhost:5000/articles',resource)
  )
   
  };
  
   
  