import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Request from '../Request';
import Header from '../Partials/Header';
import Search from '../Partials/Search';
import Weather from '../Partials/Weather';
import Footer from '../Partials/Footer';

class Home extends Component {
  state = {
    names: ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'],
    cities: [],
  };

  componentDidMount() {
    const { names } = this.state;

    names.forEach(name => {
      Request.getCityId(name)
        .then(woeid => {
          const city = { name, woeid };
          this.setState({ ...this.state, cities: [].concat(this.state.cities, city) });
        })
        .catch(error => {
          this.setState({ ...this.state, cities: [].concat(this.state.cities, { name: '', woeid: 0 }) });
        });
    });
  }

  render() {
    const { cities } = this.state;
    const { history } = this.props;

    return (
      <Fragment>
        <Header />

        <main role="main" className="container">
          <Search history={history} />

          <div className="row">
            { cities.map(city => <Weather key={city.woeid} city={city.name} woeid={city.woeid} history={history} />) }
          </div>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
