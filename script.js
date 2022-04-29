const searchInput = document.querySelector(".search");
const footer = document.querySelector(".list");

const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6";
let cities = [];

fetch(endpoint)
  .then(blob => {
    return blob.json();
  })
  .then(data => cities.push(...data))
  .catch(err => console.log(err));


function findMatches(wordtomatch,cities){
  return cities.filter(place => {
    const regex = new RegExp(wordtomatch,"gi");
    return place.city.match(regex) || place.state.match(regex);
  })
}

function changeInput(){
  const matchArray = findMatches(this.value,cities);
  
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value,"gi");
    const newCity = place.city.replace(regex,`<p class="par">${this.value}</p>`);
    const newState = place.state.replace(regex,this.value);
    
    return `
     <li>
        <span class="city">${newCity},${newState}</span>
        <span>${place.population}</span>
     </li>
    `;
}).join("");

  footer.innerHTML = html;
}

searchInput.addEventListener("change",changeInput);
searchInput.addEventListener("keyup",changeInput);


