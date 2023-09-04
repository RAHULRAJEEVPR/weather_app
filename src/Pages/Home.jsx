import React, { useEffect, useState } from "react";

import search_icon from "../assets/search.png";
import "../Pages/Home.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import snow_icon from "../assets/snow.png";
import rain_icon from "../assets/rain.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import {toast}  from "react-toastify"
const api_key = import.meta.env.VITE_API_KEY;

function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("London");
  const [temp, setTemp] = useState(20);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState(cloud_icon);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key}`;
  const imageFun=(value)=>{
    if (value === "01d" || value === "01n") {
      setIcon(clear_icon);
    } else if (
      value === "02d" ||
      value === "02n"
    ) {
      setIcon(cloud_icon);
    } else if (
      value === "03d" ||
      value === "03n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      value === "04d" ||
      value === "04n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      value === "09d" ||
      value === "09n"
    ) {
      setIcon(rain_icon);
    } else if (
      value === "10d" ||
      value === "10n"
    ) {
      setIcon(rain_icon);
    } else if (
      value === "13d" ||    
      value === "13n"
    ) {
      setIcon(snow_icon);
    } else {
      setIcon(clear_icon);
    }
  }
  useEffect(() => {
    fetch(url).then((e) => {
      e.json().then((data) => {
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setCity(data.name);
        imageFun(data.weather[0].icon)
      })
    });
  }, []);

  const getData = async () => {
    if (search.trim() == "") {
      console.log("empty");
      toast.warn("input field is empty")
      return;
    }
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setCity(data.name);
    imageFun(data.weather[0].icon)
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-gradient-to-t  relative w-2/5 h-5/6 from-blue-800 to-blue-900 rounded-md ">
        <div className=" flex mt-9">
          <input
            type="text"
            className="  left-20 h-12 ps-5 rounded-full ms-20 w-72"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={getData}>
            <img
              src={search_icon}
              alt=""
              className="bg-white rounded-full ms-4 p-3 ps-4 w-12 h-12 "
            />
          </button>
        </div>
        <div className="flex justify-center relative mt-5 ">
          <div className="img w-48  ">
            <img src={icon} alt="" />
          </div>
        </div>
        <div className="text-7xl font-bold text-slate-400">{temp}°C</div>
        <div className="text-4xl font-medium mt-2 text-gray-100">{city}</div>

        <div>
          <div className="mt-14 mx-16 flex justify-between">
            <div className="flex ms">
              <img src={humidity_icon} alt="" className="w-10 h-8 mt-2" />
              <div>
                <h1 className="text-white text-3xl font-semibold ms-2">
                  {humidity}%
                </h1>
                <h1 className="text-white text-xl font-thin ms-2">Humidity</h1>
              </div>
            </div>
            <div className="flex ms">
              <img src={wind_icon} alt="" className="w-10 h-8 mt-2" />
              <div>
                <h1 className="text-white text-2xl font-semibold ms-2">
                  {wind} km/h
                </h1>
                <h1 className="text-white text-xl font-thin ms-2">
                  Wind speed
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
