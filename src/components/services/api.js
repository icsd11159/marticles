import axios from "axios";

  /**
   
   * @param resource
   * @returns {AxiosPromise}
   */
  export const getArticles = ( resource) => {
 
    return axios.get('http://localhost:5000/articles',resource).then(d => d.data );
   
  };

   /**
   
   * @param resource
   * @returns {AxiosPromise}
   */
    export const getCategories = ( resource) => {
 
      return axios.get('http://localhost:5000/categories',resource).then(d => d.data );
     
    };
     /**
   
   * @param resource
   * @returns {AxiosPromise}
   */
      export const addNewArticle = ( resource) => {
 
        return axios.post('http://localhost:5000/articles/add',resource).then(d => d.data );
       
      };

      
      export const addNewCategory = ( resource) => {
 
        return axios.post('http://localhost:5000/categories/add',resource).then(d => d.data ).catch(err => ('Error: ' + err));
       
      };
      
      /**
   
   * @param resource
   * @returns {AxiosPromise}
   */
       export const editArticle = ( resource) => {
 
        return axios.post('http://localhost:5000/articles/update',resource).then(d => d.data );
       
      };

         /**
   deleting
   * @param resource
   * @returns {AxiosPromise}
   */
          export const deleteArticle = ( resource) => {
 
            return axios.delete('http://localhost:5000/articles/delete',resource).then(d => d.data );
           
          };

          export const deleteCategory = ( resource) => {
 
            return axios.delete('http://localhost:5000/categories/delete',resource).then(d => d.data );
           
          };

          
          export const deleteArticlesCategory = ( resource) => {
 
            return axios.delete('http://localhost:5000/articles/deletecategory',resource).then(d => d.data );
           
          };

      
           /**
   * @param resource
   * @returns {AxiosPromise}
   */
            export const  filterByCategory = ( resource) => {
              console.log(resource);
              
              return axios.post('http://localhost:5000/articles/bycategory',resource).then(d => d.data );
             
            };
           /**
   * Get getSearchBy
   * @param resource
   * @returns {AxiosPromise}
   */
            export const  getSearchBy = ( resource) => {
             
              
              if(resource.by==='Id'){
                //Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer
                return axios.get('http://localhost:5000/articles/id/'+resource.value,resource.value).then(d => d.data ).catch(err => ('Error: ' + err));;
                
              }else{
                return axios.get('http://localhost:5000/articles/title/'+resource.value,resource).then(d => d.data ).catch(err => ('Error: ' + err));

              }
             
            };

            
         

      

    

  
  
   
  