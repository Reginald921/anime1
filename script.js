const searchBar = document.getElementById('searchBar');
const charactersList = document.getElementById('charactersList');

searchBar.addEventListener('keyup', (e) =>{
  const searchString = e.target.value.toLowerCase();
  console.log(searchString)
  
  const filteredCharacters = hpCharacters.top.filter((character) => {
    return (
    character.title.toLowerCase().includes(searchString) ||
    character.type.toLowerCase().includes(searchString) 
    );
  });
  displayCharacters(filteredCharacters);
});

const getCharacters = async () => {
  try {
    const res = await fetch(`
https://api.jikan.moe/v3/top/anime/1/upcoming
`);
    hpCharacters = await res.json();
    console.log(hpCharacters); 
    displayCharacters(hpCharacters.top);
  } catch(err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
  .map((character) => {
    return `
    <li class="character">
      <div>
        <h5>${character.title}</h5>
        <a  href="${character.url}"><img src="${character.image_url}"></a><br>
        <h6>${character.start_date}</h6>
      </div>
     </li>
    `
  })
  .join('');
  charactersList.innerHTML = htmlString;
};

getCharacters();