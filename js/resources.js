export function cityFilter(cities){

    for(let i=0; i<cities.length-1; i++){
        if(( (cities[i]["lat"].toFixed(3) === cities[i+1]["lat"].toFixed(3)) && (cities[i]["lon"].toFixed(3) === cities[i+1]["lon"].toFixed(3)) )){
            cities.splice(i+1, 1);
        }
        else if(cities[i]["state"] === cities[i+1]["state"]){
            cities.splice(i+1, 1);
        }
    }

    return cities;
}

export function resetOptions() {
    const cityList = document.querySelector(".cities");
    while (cityList.firstChild) {
      cityList.removeChild(cityList.firstChild);
    }
}

export function resetSearch(cityCoords) {
    document.querySelector(".search__warning").style.display = "none";
    document.querySelector(".search__warning").style.opacity = 0;
    document.querySelector(".cities").classList.remove("cities--style");
    setTimeout(() => {
        document.querySelector(".card").style.opacity = 0;
      }, 200);
    document.querySelector(".card").style.display = "none";
    resetOptions();
  
    cityCoords = [];
}