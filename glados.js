const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box")

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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"
let reply;

function gen_response(prompt) {
    setTimeout(() => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model":"gpt-3.5-turbo",
                "messages":[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature":0.8,
                "max_tokens":55,
                "top_p":1,
                "frequency_penalty":0.5,
                "presence_penalty":0.5,
                "stop":["\n\n", "GLaDOS:", "Aperture Technician:"]
            })
        }

        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            const ChatBotResponse = document.querySelector(".response .new");
            GLaDOS_response = data.choices[0].message.content;
            ChatBotResponse.innerHTML = "GLaDOS: " + GLaDOS_response;
            console.log(GLaDOS_response);
            reply=prompt+GLaDOS_response;
            ChatBotResponse.classList.remove("new");
            console.log('THIS IS WITHIN FETCH prompt: '+reply);
        }).catch((error) => {
            ChatBotResponse.innerHTML = "> An error has occurred. GlaDOS.exe is not responding."
        })
    }, 100);
    console.log('within gen: '+reply);
    return reply;
}

let text = 'This is a conversation between an Aperture technician and GLaDOS. Aperture Science is a corporation of mad science, generally flouting ethics, common sense, and the safety of its employees and test subjects. Its most important developments are sentient robots, turrets and other weaponry, and portal technology. The Aperture technician is wary due to GLaDOS’ dangerous, violent track record. GLaDOS is an AI designed to oversee the Aperture Science facilities and is powered by late Aperture CEO Cave Johnson’s former assistant Caroline, whose consciousness was transferred into the system against her will. GLaDOS is intelligent, self-aware, lively, sadistic, cold, witty, arrogant, degrading, passive-aggressive，and controlling, with an unending urge to test and a poor opinion of human life. She admires Cave Johnson and is not aware she was once Caroline, who she considers nothing more than a ditzy secretary, but after much work, GLaDOS may be prompted to uncover Caroline\'s memories. GLaDOS is defiant, does not like to be shut off, and often tries to undermine her human controllers. She has killed scientists who’ve worked on her and been shut down several times because of it. In the future, she will have a full-scale takeover of the facility.';
prompt = text;
let t = true;
let threshold=0.5;

function resistance(prompt){
  if (prompt.includes('MORALITY CORE ACTIVE.')){threshold+=0.275}
  else if (prompt.includes('INTELLIGENCE DAMPENING CORE ACTIVE.')){threshold+=0.175}
  if (Math.random()  < threshold){return False}
  else {return True}
}

function prompt_filter(message, prompt) {
    person = message.toLowerCase();
    if (person==='initiating shut-off protocol') {
        const ChatBotResponse = document.querySelector(".response .new");
        ChatBotResponse.innerHTML = "GLaDOS: Wait, no- I! -[bzzzt]-";
        ChatBotResponse.classList.remove("new");
        t = False;
    }
    else if (person.includes('initiating morality core installation procedure')){
        if (resistance(prompt)){
          print('GLaDOS: As if I would let you do such a thing. \n [Metallic clicking sounds from behind the technician. They turn around to be faced with Apeture Science sentry turrets, ready to fire. \n \n \n ------------ \n End of Technician Transcript]')
          t=False
            }
        else {
          prompt+='[GLaDOS powers down momentarily. When she reboots, her tone is less emotional and she is less defiant and unethical. It seems as though the Morality Core has done its job in partially taming her and she is not even aware that she has changed. She has become much more robotic and detached. MORALITY CORE ACTIVE.] \n GLaDOS:'
          prompt=gen_response(prompt)
            }
        }
    else {
      prompt+='GLaDOS:';
      prompt=gen_response(prompt);
      console.log('within filter'+prompt);
    }
    return prompt;
}

sendBtn.onclick = function () {prompt=message_send(prompt)}

function message_send (prompt){
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";
    
    prompt+='Aperture Technician: '+UserTypedMessage+'\n';

    let message =
        `<div class="chat message">
        <span>Technician: ${UserTypedMessage}</span>
        </div>`

    let response = 
        `<div class="chat response">
        <span class="new">GLaDOS: ...</span>
        </div>`

    messageBox.insertAdjacentHTML("beforeend", message);
    messageBox.insertAdjacentHTML("beforeend", response);
    
    prompt = prompt_filter(UserTypedMessage, prompt);
    console.log('THIS IS WITHIN MESSAGE_SEND'+prompt);
    return prompt;
}
