import { useState } from "react"


export const AppClima = () => {

  const urlBase =  'https://api.openweathermap.org/data/2.5/weather'/* ?q={city name}&appid={API key}  */
  const apiKey = '9d4eab5318f856cfbde54226147fe1d9'

  const [ciudad, setCiudad] = useState([])
  const [dataClima, setDataClima] = useState(null)

  const onCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }
 
  const onSubmit= (e) => {

    e.preventDefault()
    if(ciudad.length > 0){
        fetchClima()
    }  
  } 

  const fetchClima = async () => {
    try {

        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
        const data = await response.json()
        console.log(data)
        setDataClima(data)

    } catch (error) {
        console.log('se ha producido un error al traer la informacion: ', error)
    }
  }

  return (
    <> <h1>Aplicacion del Clima</h1>
        <form className='container' onSubmit={onSubmit}>
            <input 
            type="text" 
            value={ciudad}
            onChange={onCambioCiudad}
             />
            <button type="submit">Buscar</button>

        </form>

      {
        dataClima && (
            <div>
              <h2>{dataClima.name} </h2>
              <h2>temperatura: {Math.round(parseInt(dataClima.main.temp)-273.15)}°C</h2>
              <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
            </div>

        )
        
        

      }
      


    </>
  )
}
