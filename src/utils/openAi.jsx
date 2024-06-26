import { openAIKey } from './constants';


import LlamaAI from 'llamaai';


const apiToken = openAIKey;
const llamaAPI = new LlamaAI(apiToken);
export default llamaAPI ;


// llamaAPI
//   .run(apiRequestJson)
//   .then((response) => {
//     // Process response
//   })
//   .catch((error) => {
//     // Handle errors
//   });

// export default headers ;