import React from 'react'

    const WeatherDetails=({icon,temp,city,country,lat,log,win,hum,wind,humidity})=>{
  
      return(
      <>
      
      <div className='image'>
        <img src={icon} alt="Image" />
      </div>
      <div className="temperature"> {temp}°C</div>
      <div className="location">{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
        <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" className='icon'/>
          <div className="humidity-percent">{hum} %</div>
          <div className="text">Humidity</div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className='icon'/>
          <div className="wind-percent">{win} Km/Hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
      
      </>)
    }
    
  

export default WeatherDetails