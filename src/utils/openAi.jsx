import { openAIKey } from './constants';


import LlamaAI from 'llamaai';


const apiToken = openAIKey;
const llamaAPI = new LlamaAI(apiToken);
console.log(llamaAPI)



export default llamaAPI ;
