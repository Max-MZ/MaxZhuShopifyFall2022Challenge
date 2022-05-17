import { pool } from '../api/postgres.js'
import { getCurrentWeather } from '../api/weather.js'
const cities = ["Waterloo", "Chicago", "Toronto", "London", "Seattle"];
const apiKey = "b68b7ccb1f294d7a84315200221605";


async function updateWeather(page = 1){

    let currentWeather = [];

    for(let i = 0; i < cities.length; i++){
        const currCity = cities[i];

        const currTemp = await getCurrentWeather(currCity)

        const tempString = `${currTemp.temp} degrees Celcius, ${currTemp.desc}`;

        await update(currCity, tempString);
 
    }
    return currentWeather
  }

async function create(item){
    console.log(item.name, item.warehouse)
  const result = await pool.query(
    `INSERT INTO Items  (ItemName, WarehouseLocation, Active) VALUES ($1, $2, $3)`, 
    [
      item.name, item.warehouse, 'true'
    ]
  );

  let message = 'Error in creating item';

  if (result.rowCount) {
    message = 'Item created successfully';
  }

  return {message};
}

async function update(city, weather){

  const result = await pool.query(
    `UPDATE Warehouses 
    SET weather=$1 
    WHERE warehouselocation=$2`, 
    [
      weather, city
    ]
  );

  let message = 'Error in updating item';

  if (result.rowCount) {
    message = 'item updated successfully';
  }

  return {message};
}


export { create, update, updateWeather}