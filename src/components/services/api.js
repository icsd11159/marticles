import axios from "axios";

  /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
  export const getArticles = ( resource) => {
 
    return axios.get('http://localhost:5000/articles',resource).then(d => d.data );
   
  };

   /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
    export const getCategories = ( resource) => {
 
      return axios.get('http://localhost:5000/categories',resource).then(d => d.data );
     
    };
     /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
      export const addNewArticle = ( resource) => {
 
        return axios.post('http://localhost:5000/articles/add',resource).then(d => d.data );
       
      };
      
      /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
       export const editArticle = ( resource) => {
 
        return axios.post('http://localhost:5000/articles/update',resource).then(d => d.data );
       
      };

         /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
          export const deleteArticle = ( resource) => {
 
            return axios.delete('http://localhost:5000/articles/delete',resource).then(d => d.data );
           
          };

      

    

  
  
   
  