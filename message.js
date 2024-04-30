const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box")

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "[Insert API Key]"

sendBtn.onclick = function () {
    if (messageBar.value.length > 0){
        let message =
        `<div class="chat message">
        <span>Technician: ${messageBar.value}</span>
        </div>`

        let response = 
        `<div class="chat response">
        <span>$</span>
        </div>`

        messageBox.insertAdjacentHTML("beforeend", message);

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", response);

            const requestOptions = {
                method: POST,
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    "model":"gpt-3.5-turbo",
                    "messages":[
                        {
                            "role": "user",
                            "content": messageBar.value
                        }
                    ],
                    "temperature":"0.8",
                    "max_tokens":"55",
                    "top_p":"1",
                    "frequency_penalty":"0.5",
                    "presence_penalty":"0.5",
                    "stop":["\n\n", "GLaDOS:", "Aperture Technician:"]
                })
            }

            fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        }, 100);
    }
}