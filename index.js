const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require("dotenv").config();
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["AZURE_OPENAI_KEY"] ;
const deploymentId = process.env["DEPLOYMENT_ID"] ;

const prompt = ["What is Azure OpenAI?"];

async function main() {
  console.log("== Get completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  //const {choices} = await client.getCompletions(deploymentId, prompt);


  const response = await client.getCompletions(deploymentId,prompt);

    //   messages=[
    //       {"role": "system", "content": "You are a helpful assistant."},
    //       {"role": "user", "content": "Who won the world series in 2020?"}
    //   ])

      console.log(  response.choices[0].text);

//   response = openai.ChatCompletion.create(
//     engine=chatgpt_model_name,
//     messages=[
//           {"role": "system", "content": "You are a helpful assistant."},
//           {"role": "user", "content": "Who won the world series in 2020?"}
//       ]
//   )


//   for (const choice of result.choices) {
//     console.log(choice.text);
//   }
//console.log(choices[0].text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };