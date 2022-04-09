import axios from "axios";

  /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
  export const getArticles = ( resource) => {
 
    return axios.get('http://localhost:5000/articles',resource).then(d => d.data );
   
  };
  
   
  