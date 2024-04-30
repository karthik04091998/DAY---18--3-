let form = document.getElementById('dictform');
let wordInfo = document.getElementById('meaningforward');
let wordInput = document.getElementById('wordinput');
let Searchbtn = document.getElementById('searchbtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let word = document.getElementById('wordinput').value;
    getmeaning(word);
});

Searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let word = document.getElementById('searchbtn').value;
    getmeaning(word);
});

async function getmeaning(word) {
    try {

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        let data = await response.json();
        let paragraph = document.createElement('div');
        let list = document.createElement('ul');
        let meanings = data[0].meanings;

        list.style.listStyleType = 'none';
        meanings.forEach(meaning => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `PartOfSpeech: <strong>${meaning.partOfSpeech}</strong>:`;

            let definitions = meaning.definitions;
            let subList = document.createElement('ol');

            for (let definition of definitions) {
                let subListItem = document.createElement('li');
                subListItem.innerHTML = `<em>${definition.definition}</em>`
                subList.appendChild(subListItem);
            }

            listItem.appendChild(subList);
            list.appendChild(listItem);
        });

        paragraph.innerHTML = `
        <span class='fas fa-volume-up' id='audio-icon'></span>
        <audio id='audio'>
            <source src=${data[0].phonetics[0].audio.toString()} type='audio/mpeg'>
        </audio>
        Word: <strong>${data[0].word}</strong>`;

        wordInfo.innerHTML = '';
        wordInfo.appendChild(paragraph);
        wordInfo.appendChild(list);

        document.getElementById('audio-icon').addEventListener('click', () => {
            document.getElementById('audio').play();
        });
    } catch (error) {
        console.log(error);
        wordInfo.innerHTML = `<p class='text-danger'>The word <strong>${word}</strong> is not found in the dictionary</p>`;
    }
}
