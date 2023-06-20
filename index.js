const express = require("express");
require("dotenv").config();
const {Configuration, OpenAIApi} = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    res.json({msg: 'Hello world!!!'});
});

app.post("/emoji-to-movie", async(req,res)=>{
    try {
        const{movie} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Convert emojis to movie titles.\n\n" + `${movie}` +":",
            //prompt: "Convert movie titles into emoji.\n\nBack to the Future:",
            // prompt: 
            //     `${prompt}`
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
          });
          return await res.status(200).json({
            sucess: true,
            data: response.data.choices[0].text
          });
    } catch (error) {
        
    }
})

app.post("/friendly-chat", async(req,res)=>{
    const{prompt} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ["You:"],
      });
      return await res.status(200).json({
        sucess: true,
        data: response.data.choices[0].text
      });
      
})


app.post("/movie-to-emoji", async(req,res)=>{
    try {
        const{movie} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Convert movie titles into emoji.\n\n" + `${movie}` +":",
            //prompt: "Convert movie titles into emoji.\n\nBack to the Future:",
            // prompt: 
            //     `${prompt}`
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
          });
          return await res.status(200).json({
            sucess: true,
            data: response.data.choices[0].text
          });
    } catch (error) {
        
    }
})



app.post("/find-complexity", async(req,res)=>{
    try {
        const{promp} = req.body;
        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`
                ${prompt}

                The time complexity of this funcion is ###
            `,
            max_tokens:64,
            temperature:0,
            top_p:1.0,
            frequency_penalty:0.0,
            presence_penalty:0.0,
            stop:["\n"],
        });
        return await res.status(200).json({
            sucess: true,
            data: response.data.choices[0].text
          });
    } catch (error) {
        return await res.status(400).json({
            sucess: false,
            error: error.response
                ?error.response.data
                :"There was an issue on the server",
          });
    }
});


// app.post("/find-complexity", async(req,res)=>{
//      try {
//         return await res.status(200).json
//      } catch (error) {
        
//      }
// });

const port = process.env.PORT || 5000;

app.listen(port, () =>console.log(`Server listening on port ${port}`));
