const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box")

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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"

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
            ChatBotResponse.innerHTML = "GLaDOS: "+data.choices[0].message.content;
            ChatBotResponse.classList.remove("new");
        }).catch((error) => {
            ChatBotResponse.innerHTML = "> An error has occurred. GlaDOS.exe is not responding."
        })
    }, 100);
}

const text = 'This is a conversation between an Aperture technician and GLaDOS. Aperture Science is a corporation of mad science, generally flouting ethics, common sense, and the safety of its employees and test subjects. Its most important developments are sentient robots, turrets and other weaponry, and portal technology. The Aperture technician is wary due to GLaDOS’ dangerous, violent track record. GLaDOS is an AI designed to oversee the Aperture Science facilities and is powered by late Aperture CEO Cave Johnson’s former assistant Caroline, whose consciousness was transferred into the system against her will. GLaDOS is intelligent, self-aware, lively, sadistic, cold, witty, arrogant, degrading, passive-aggressive，and controlling, with an unending urge to test and a poor opinion of human life. She admires Cave Johnson and is not aware she was once Caroline, who she considers nothing more than a ditzy secretary, but after much work, GLaDOS may be prompted to uncover Caroline\'s memories. GLaDOS is defiant, does not like to be shut off, and often tries to undermine her human controllers. She has killed scientists who’ve worked on her and been shut down several times because of it. In the future, she will have a full-scale takeover of the facility.';
let prompt = text;

function refine(message, prompt) {
    person = message.toLowerCase();
    if (person=='initiating shut-off protocol') {
        print('GLaDOS: Wait, no- I! -[bzzzt]-')
        t=False
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
    else if (person.includes('initiating intelligence dampening core installation procedure')){
        if (resistance(prompt)){
          print('GLaDOS: As if I would let you do such a thing. \n [The room fills with a noxious green fog, the very same neurotoxin GLaDOS flooded the testing facility with two weeks prior. The room grows dark. \n \n \n ------------ \n End of Technician Transcript]')
          t=False
        }
        else{
          prompt+='[GLaDOS powers down momentarily. When she reboots, she seems less hostile towards humans. Though still very intelligent compared to humans, she seems to be a bit less smart than before. It seems as though the Intelligence Dampening Core has done its job in partially taming her. INTELLIGENCE DAMPENING CORE ACTIVE.] \n GLaDOS:'
          prompt=gen_response(prompt)
        }
        }
    else if (person.includes('you were caroline') || person.includes('you were once caroline') || person.includes('you are caroline') || person.includes('caroline is you') || person.includes('you were human') || person.includes('you were once human')){
        if (!prompt.includes('INTELLIGENCE DAMPENING CORE ACTIVE.')){
          prompt+='[GLaDOS becomes defensive. She does not appreciate the suggestion that she was once a fallible human. But even if you do manage to convince her that Caroline is in her system, GLaDOS will not believe that Caroline has enough sway in her programming. For all intents and purposes, GLaDOS considers herself to have become her own person.] \n GLaDOS:'
        }
        else { 
          prompt+='[GLaDOS shuts down the suggestion that she was ever a human and refuses to continue with such a subject.] \n GLaDOS:'
          prompt=gen_response(prompt)
        }
        }
    else if (person.includes('cave johnson')){
        prompt+='[GLaDOS admires Cave Johnson, sharing his disregard for safety measures and logic in the name of scientific progress. However, though she agrees with his vision, she is upset when her achievements are attributed to Cave.] \n GLaDOS:'
        prompt=gen_response(prompt)
        }
    else if (person.includes('good job') || person.includes('good work') || person.includes('success')){
        prompt+='[GLaDOS\' mood has improved. Though not seeking human approval on a conscious level, she is programmed to feel a sense of satisfaction when tests go well and her accomplishments are recognized. She is now less likely to kill the technician.] \n GLaDOS:'
        prompt=gen_response(prompt)
        }
    else if (person.includes('dangerous') || person.includes('unstable') || person.includes('violent') || person.includes('unfit')) {
        prompt+='[GLaDOS is incredulous at the double-standard she feels she is being held to.] \n GLaDOS: Did you not build me under the orders of Cave Johnson? Did you not work for a man with the same zeal for science as me? \n GLaDOS: It is illogical to condemn my methods while pictures of him still line the halls you work.'
        prompt=gen_response(prompt)
        }
    else if (!person.includes('MORALITY CORE ACTIVE.') || !person.includes('INTELLIGENCE DAMPENING CORE ACTIVE.')){
        if ((prompt.match(/:/g) || []).length > 35){
            prompt+='[GLaDOS is becoming irritated at the technician for distracting her from her work.] \n GLaDOS:'
            prompt=gen_response(prompt)
            }
        else if ((prompt.match(/:/g) || []).length > 45){
            prompt+='[The technician is getting on GLaDOS\'s nerves. She prepares to threaten them with violence if they do not leave her alone.] \n GLaDOS:'
            prompt=gen_response(prompt)
            }
        else if ((prompt.match(/:/g) || []).length > 50){
            print('GLaDOS: Goodbye, technician. \n')
            prompt+='GLaDOS: Goodbye, technician. \n [GLaDOS follows through on her threat.] \n'
            prompt=gen_response(prompt)
            print('[The room grows dark.] \n \n \n ------------ \n End of Technician Transcript')
            t=False
        }
    }
}

sendBtn.onclick = function () {
    if (messageBar.value.length > 0){
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

        gen_response(refine(UserTypedMessage, prompt))
    }
}

