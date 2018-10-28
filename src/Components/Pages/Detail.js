import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Request from '../Request';
import Header from '../Partials/Header';
import Search from '../Partials/Search';
import Weather from '../Partials/Weather';
import Footer from '../Partials/Footer';

class Detail extends Component {
  state = {
    loader: true,
    details: {},
  };

  componentDidMount() {
    const { match } = this.props;

    Request.getWeatherDetails(match.params.woeid)
      .then(data => {
        this.setState({ details: data });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({ loader: false });
      });
  }

  renderOthers = () => {
    const { details } = this.state;
    const { history } = this.props;

    if (Object.keys(details).length > 0) {
      return details.consolidated_weather.map((day, index) => (
        <Weather
          key={index}
          showDay
          day={day}
          city={details.title}
          woeid={details.woeid}
          history={history} 
        />
      ));
    }
  };

  render() {
    const { details, loader } = this.state;
    const { history, match } = this.props;

    return (
      <Fragment>
        <Header />

        <main role="main" className="container">
          <Search history={history} />

          <div className="row">
            <Weather city={details.title} woeid={match.params.woeid} history={history} />
          </div>

          <div className="row mt-5">
            <div className="col-md-12">
              <h3>Other Days</h3>
              <hr />
            </div>
          </div>

          <div className={`text-center ${loader ? '' : 'd-none'} `}>
            <i className="fa fa-spin fa-circle-o-notch fa-4x" style={{ color: '#6c757d' }} />
          </div>

          <div className="row mt-2">{this.renderOthers()}</div>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

Detail.defaultProps = {};

Detail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Detail;
