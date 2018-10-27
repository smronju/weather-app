import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from '../Request';

class Weather extends Component {

  state = {
    loader: true,
    error: false,
    info: {}
  }

  componentDidMount () {
    const {city} = this.props;

    Request.getWeatherInfoByWoeid(city.woeid)
    .then(response => {
        this.setState({ info: response });
      })
      .catch(error => {
        this.setState({ error: true })
      })
      .then(() => {
        this.setState({ loader: false })
      });
  }

  render () {
    const { city } = this.props;
    const { loader, error, info } = this.state;

    if (loader) {
      return (
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body d-flex">
              <i className="fa fa-spin fa-circle-o-notch fa-4x" style={{ color: '#6c757d' }}></i>
            </div>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body d-flex">
              <i class="fa fa-times fa-4x" style={{ color: 'red' }}></i>
              <span>Failed to load</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <div className="card-body d-flex">
            <img src={`https://www.metaweather.com/static/img/weather/${info.weather_state_abbr}.svg`} alt="img" className="w-25" /> 
            <h2 className="card-title my-3">{city.name}</h2>
            <h4 className="card-subtitle mb-4 text-muted">{ Math.round(info.the_temp) } &deg;C</h4>
            
            <div className="row w-100">
              <div className="col text-center">
                <div>minimum</div>
                <div className="small-temp text-muted">{ Math.round(info.min_temp) } &deg;C</div>
              </div>
              
              <div className="col text-center">
                <div>maximum</div>
                <div className="small-temp text-muted">{ Math.round(info.max_temp) } &deg;C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Weather.defaultProps = {
  loader: true,
  error: false,
  info: {}
};

Weather.propTypes = {
  city: PropTypes.object.isRequired
};

export default Weather;