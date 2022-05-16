import { request } from "express";
import axios from "axios";

const cities = ["Waterloo", "Chicago", "Toronto", "London", "Seattle"];
const apiKey = "b68b7ccb1f294d7a84315200221605";
export const getCurrentWeather = async( city ) =>{


    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b68b7ccb1f294d7a84315200221605&q=${city}`)

    const currDetails = {
        "city": res.data.location.name,
        "temp": res.data.current.temp_c,
        "desc": res.data.current.condition.text
    }

    return currDetails;
   
}