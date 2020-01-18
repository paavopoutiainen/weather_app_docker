const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || 'b9f72310a5156e47ce945312605c37c7';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'helsinki';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (city) => {
  var endpoint = `${mapURI}/weather?q=${city}&appid=${appId}&`;

  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather/:city', async ctx => {
  const city = ctx.request.path.substring(13);
  console.log(city);
  const weatherData = await fetchWeather(city);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();
  console.log('hello');
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
