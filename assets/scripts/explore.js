// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const textInput = document.getElementById('text-to-speak');
  const options = document.querySelector('select');
  const speakButton = document.querySelector('button');
  const icon = document.querySelector('img');

  let voices = [];
  function populateVoiceList() {
    voices = synth.getVoices();
    
    for(let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      options.appendChild(option);
    }
  }
  populateVoiceList();

  window.speechSynthesis.onvoiceschanged = function(e) {
    populateVoiceList();
  };

  function speak(text)
  {
    const input = new SpeechSynthesisUtterance(textInput.value);
    const option = options.selectedOptions[0].getAttribute('data-name');
    input.text = text;

    for(let i = 0; i < voices.length; i++)
    {
      if(voices[i].name == option)
        input.voice = voices[i];
    }

    synth.speak(input);
    input.addEventListener('end', (_event) =>
    {
      icon.src = 'assets/images/smiling.png';
    })
  }

  speakButton.addEventListener('click', (_event) =>
  {
    icon.src = 'assets/images/smiling-open.png';
    speak(textInput.value);
  }
  )
}