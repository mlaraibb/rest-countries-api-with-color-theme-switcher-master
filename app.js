//All selectors
const countriesEl = document.querySelector(".countries");
const dropDown = document.querySelector(".dropdown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");

//fetch API

async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const resp = await url.json();
  console.log(resp);
  resp.forEach((element) => {
    showCountry(element);
  });
}

//get countries description

getCountry();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `<div class="country-img">
    <img src= "${data.flag}" alt="">
</div>
<div class="country-info">
    <h5 class = 'countryName'>${data.name}</h5>
    <P><strong>Population:</strong>${data.population}</P>
    <P class = 'regionName'><strong>Region:</strong>${data.region}</P>
    <P><strong>Capital:</strong>${data.capital}</P>
</div>`;
  countriesEl.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetail(data);
  });
}
//dropdown-menu
dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");

});
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach(element=>{
  element.addEventListener('click',()=>{
    console.log(element);
  Array.from(regionName).forEach(elem =>{
    console.log(elem.innerText);
    if(elem.innerText.includes(element.innerText)|| element.innerText == "All"){
      elem.parentElement.parentElement.style.display = "grid";
    }else{
      elem.parentElement.parentElement.style.display = "none";
    }
  });
  })
});

//make searchbutton work

search.addEventListener("input", () => {
  console.log(search.value.toLowerCase());
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});

//toggle

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});

//country modal

const countryModal = document.querySelector(".countryModal");
function showCountryDetail(data) {
  countryModal.classList.toggle("show");
  countryModal.innerHTML = `
    <button class="back"><i class="fa-sharp fa-solid fa-arrow-left-long"></i>Back</button>

    <div class="modal">
    <div class="leftModal">
        <img src="${data.flag}" alt="">
    </div>
    <div class="rightModal">
        <h1>${data.name}</h1>
        <div class="modalInfo">
            <div class="innerLeft inner">
                <P><strong>Native Name:</strong>${data.nativeName}</P>
                <P><strong>Population:</strong>${data.population}</P>
                <P><strong>Region:</strong>${data.region}</P>
                <P><strong>Sub-Region:</strong>${data.subregion}</P>
            </div>
            <div class="innerRight inner">
                <P><strong>Capital:</strong>${data.capital}</P>
                <P><strong>Top Level Domain:</strong>${data.topLevelDomain.map(elem =>elem)}</P>
                <P><strong>Currencies:</strong>${data.currencies.map(elem=>elem.name)}</P>
                <P><strong>Languages:</strong>${data.languages.map(elem=>elem.name)}</P>
            </div>
        </div>
        </div>
        <div class="border">
        <h3>Border Countries:</h3>
        <li><a href = "">Germany</a></li>
        <li><a href = "">France</a></li>
        <li><a href = ""> Netherland</a></li>
        </div>
        
    </div>`;
    
    //
  const back = document.querySelector(".back");
 
  back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
  });
}
