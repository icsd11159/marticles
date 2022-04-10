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
      
           /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
            export const  filterByCategory = ( resource) => {
              console.log(resource);
              
              return axios.post('http://localhost:5000/articles/bycategory',resource).then(d => d.data );
             
            };
           /**
   * Get routes frequency
   * @param resource
   * @returns {AxiosPromise}
   */
            export const  getSearchBy = ( resource) => {
              console.log(resource.by.target.id);
              if(resource.by.target.id==='Id'){
                return axios.get('http://localhost:5000/articles/id/'+resource.value,resource.value).then(d => d.data );

              }else{
                return axios.get('http://localhost:5000/articles/title/'+resource.value,resource).then(d => d.data );

              }
             
            };

            
         

      

    

  
  
   
  