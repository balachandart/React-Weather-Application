import React,{useEffect, useState} from 'react'
import './App.css';
import { FaSearch } from "react-icons/fa";
import WeatherDetails from './WeatherDetails';
import clear from "./images/clear.png"
import cloud from "./images/cloud.jpg"
import drizzle from "./images/images1.jpg"
import humidity from "./images/hum.png"
import rain from "./images/rain.png"
import sunny from "./images/sunny.png"
import wind from "./images/wind.png"

function App() {
  const [search,setSearch]=useState(" ")
  const[icon,setIcon]=useState(rain)
  const[temp,setTemp]=useState(0)
  const[city,cityName]=useState("")
  const[country,setCountry]=useState("In")
  const[lat,setLat]=useState(0)
  const[log,setLog]=useState(0)
  const[win,setWin]=useState(0);
  const[hum,setHum]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const submitted= async()=>{
    setLoading(true)
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8a629bd469ac26bfe1e9c4b86f445163&units=Metric`
    try
    {
      let response= await fetch(url)
      let data=await response.json()
      console.log(data)
      if(data.cod==="404"){
        setCityNotFound(true)
        setLoading(false)
        return;
      }
      else{
        setHum(data.main.humidity)
        setWin(data.wind.speed)
        setTemp(Math.floor(data.main.temp))
        setCountry(data.sys.country)
        cityName(data.name)
        setLat((data.coord.lat))
        setLog(data.coord.lon)
        // const weatherIcons=data.weather[0].icon;
        // setIcon(iconMap[weatherIcons] || clear)
        
        if(data.weather[0].main === "Clouds"){
          setIcon(cloud)
        }
        else if(data.weather[0].main === "Clear"){
          setIcon(clear)
        }
        else if(data.weather[0].main === "Rain"){
          setIcon(rain)
        }
        else if(data.weather[0].main === "Sunny"){
          setIcon(sunny)
        }
        else if(data.weather[0].main === "Drizzle"){
          setIcon(drizzle)
        }
        else{
          setIcon(clear)
        }
        setCityNotFound(false)
      }

    }
    catch(error){
          console.log(error)
          setError("An error occured while fetching weather data.")
    }
    finally{
      setLoading(false)

    }
  }
 useEffect(()=> {
  submitted(); 
  //eslint-disable-next-line
  } ,[]  )


  function onkeyDown(e){      
      if(e.key === "Enter")
        submitted();
  }
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text"
        placeholder='Search City'
        className='city-input' 
        autoFocus
        value={search}
        onChange={(e)=>setSearch(e.target.value)} 
        onKeyDown={(e)=>onkeyDown(e)}/>
        <div className='search-icon'>
        <FaSearch 
        type='button'
        tabIndex="1" 
        onClick={submitted}/>
        </div>
      </div>
      {!loading && !cityNotFound &&   <WeatherDetails 
      icon={icon}
      temp={temp}
      city={city}
      country={country}
      wind={wind}
      humidity={humidity}
      lat={lat}
      log={log}
      hum={hum}
      win={win}
      search={search}/>}
    
       <div className="developer"> Designed By <a href="https://balachandart.github.io/Portfolio/">balachandar.</a></div>
     {loading && <div className='loading-message'>Loading...</div>} 
     {error && <div className='error-message'>{error}</div>}   
     {search !== 0 && cityNotFound && <div className="city-not-found">City not found</div>} 
    </div>
    
    </>
  );
}

export default App;
