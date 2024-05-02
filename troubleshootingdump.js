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