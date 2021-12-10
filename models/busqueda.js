const fs = require("fs");

const axios = require("axios");

class Busqueda {
  historial = [];

  constructor() {
    // TODO: leer DB si existe
    this.historial = this.leerDB();
  }

  params() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
    };
  }
  get historialCapitalizado() {
    const capi = this.historial.map((histo) => {
      const palabra = histo.split(" ");
      const newpal = palabra.map((h) => h.charAt(0).toUpperCase() + h.slice(1));
      return newpal.join(" ");
    });

    return capi;
  }
  async ciudad(lugar = "") {
    //peticion http
    //const ciudad=await axios()
    try {
      const axiosIns = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.params(),
      });

      const { data } = await axiosIns.get();

      return data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lon: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }

  // traemos el clima del lugar pasado por parametro desde la api
  get parametrosClima() {
    //console.log("este es el objeto lugar,",lugar);

    return {
      //lat=41.3825&&&units=metric&lang=es
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  async climaLugar({ lat, lon }) {
    try {
      const axiosInst = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.parametrosClima, lat, lon },
      });
      const { data } = await axiosInst.get();

      return {
        descripcion: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        tem: data.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
  get historial() {
    return this.historial;
  }
  guadarHistorial({ nombre } = "") {
    if (this.historial.includes(nombre.toLocaleLowerCase())) return;

    this.historial= this.historial.slice(0,4);
    this.historial.unshift(nombre.toLocaleLowerCase());
    this.guardaEnDB();
  }

  guardaEnDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync("./DB/historial.json", JSON.stringify(payload));
  }
  leerDB() {
    if (!fs.existsSync("./DB/historial.json")) return null;
    const lect = fs.readFileSync("./DB/historial.json", { encoding: "utf-8" });
    const { historial } = JSON.parse(lect);
    return historial;
  }
}

module.exports = Busqueda;
