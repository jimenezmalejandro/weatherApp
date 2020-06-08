const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')

const updateUI = (data) =>{

    const { cityDetails :citDets , weather } = data
    

    //update details template right hea
    details.innerHTML = `
    <h5 class="my-3">${citDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `
    //Remove d-none class if present
     if(card.classList.contains('d-none')){
         card.classList.remove('d-none')
     }

}

const updateCity = async (city)=>{

    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)

    return { cityDetails, weather}
}

cityForm.addEventListener('submit', (e) =>{

    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    //update ui with the new city
    updateCity(city)
    .then( data => updateUI(data) )
    .catch (err => console.log(err))

})

