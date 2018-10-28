import axios from 'axios';

class Request {
  constructor() {
    axios.defaults.baseURL = 'http://dev.smronju:8888/wheather.php';
  }

  getCityId(cityName) {
		return new Promise((resolve, reject) => {

			axios.get(`?command=search&keyword=${cityName}`)
				.then(({data}) => {
          const city = data[0];
          
					if(city){
						resolve(city.woeid);
          }
          
					reject(false);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	getWeatherInfoByWoeid(woeid) {
		return new Promise((resolve, reject) => {
			axios.get("?command=location&woeid="+woeid)
			.then(({data}) => {
				let wheather = data.consolidated_weather[0];
				
				if(wheather){
					resolve(wheather);
				}
				
				reject(false);
			})
			.catch(error => {
				reject(error);
			})
		});
	}

	getWeatherDetails(woeid) {
		return new Promise((resolve, reject) => {
			axios.get(`?command=location&woeid=${woeid}`)
			.then(({data}) => {
				const wheather = data;

				if(wheather){
					resolve(wheather);
				}

				reject(false);
			})
			.catch(error => {
				reject(error);
			})
		});
	}

	getWeatherBySearch(text) {
		return new Promise((resolve, reject) => {

			axios.get(`?command=search&keyword=${text}`)
				.then(({data}) => {
					const cities = data;

					resolve(cities);
				});
		});
	}

}

export default new Request();