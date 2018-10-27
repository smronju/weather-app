import axios from 'axios';

class Request {
  constructor () {
    axios.defaults.baseURL = 'http://dev.smronju:8888/wheather.php';
  }

  getCityId(city) {
		return new Promise((resolve, reject) => {

			axios.get(`?command=search&keyword=${city}`)
				.then(({data}) => {
          let city = data[0];
          
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

}

export default new Request();