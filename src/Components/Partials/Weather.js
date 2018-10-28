import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from '../Request';

class Weather extends Component {
  state = {
    loader: true,
    error: false,
    info: {},
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayName: '',
  };

  componentDidMount() {
    const { days } = this.state;
    const { woeid, day } = this.props;
    let date = '';

    if (Object.keys(day).length > 0) {
      date = new Date(day.applicable_date);
      this.setState({ info: day, loader: false, dayName: days[date.getDay()] });
      return true;
    }

    Request.getWeatherInfoByWoeid(woeid)
      .then(response => {
        this.setState({ info: response });
      })
      .catch(error => {
        this.setState({ error: true });
      })
      .then(() => {
        this.setState({ loader: false });
      });
  }

  handleClick = () => {
    const { error } = this.state;
    const { history, city, woeid } = this.props;

    if (error) {
      alert(`Cant load weather for ${city}`);

      return false;
    }

    history.push(`/weather/${woeid}`);
  };

  render() {
    const { loader, error, info } = this.state;
    const { city, showDay } = this.props;

    if (loader) {
      return (
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body d-flex">
              <i className="fa fa-spin fa-circle-o-notch fa-4x" style={{ color: '#6c757d' }} />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-body d-flex">
              <i className="fa fa-times fa-4x" style={{ color: 'red' }} />
              <span>Failed to load</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="col-md-4" onClick={this.handleClick}>
        <div className="card mb-4 box-shadow">
          <div className="card-body d-flex">
          <h5 className={`card-title my-3 text-center ${showDay ? '' : 'd-none' }`} style={{ color: 'red' }}>
            {this.state.dayName}
            <div className={`text-center ${showDay ? '' : 'd-none' }`} style={{ fontSize: '1rem', color: 'silver' }}>
              {info.applicable_date}
            </div>
          </h5>

            <img
              src={`https://www.metaweather.com/static/img/weather/${info.weather_state_abbr}.svg`}
              alt="img"
              className="w-25"
            />
            <h2 className="card-title my-3">{city}</h2>
            <h4 className="card-subtitle mb-4 text-muted">{Math.round(info.the_temp)} &deg;C</h4>

            <div className="row w-100">
              <div className="col text-center">
                <div>minimum</div>
                <div className="small-temp text-muted">{Math.round(info.min_temp)} &deg;C</div>
              </div>

              <div className="col text-center">
                <div>maximum</div>
                <div className="small-temp text-muted">{Math.round(info.max_temp)} &deg;C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Weather.defaultProps = {
  day: {},
  city: '',
  woeid: 0,
  showDay: false,
};

Weather.propTypes = {
  day: PropTypes.object,
  city: PropTypes.string,
  woeid: PropTypes.number,
  showDay: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default Weather;
