import React, { Fragment, Component } from 'react';
import Request from '../Request';
import Header from '../Partials/Header';
import Search from '../Partials/Search';
import Weather from '../Partials/Weather';
import Footer from '../Partials/Footer';

class Home extends Component {
  state = {
    names: ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'],
    cities: []
  }

  componentDidMount () {
    this.state.names.forEach(name => {
      Request.getCityId(name).then(woeid => {
        let city = {name, woeid }
        this.setState({ ...this.state, cities: [].concat(this.state.cities, city) });
      }).catch(error => {
        this.setState({ ...this.state, cities: [].concat(this.state.cities, { name: '', woeid: 0 }) });
      })
    });
  }

  render ()  {
    const { cities } = this.state;

    return (
      <Fragment>
        <Header />

        <main role="main" className="container">
          <Search />

          <div className="row">
            { cities.map(city => <Weather key={city.woeid} city={city} />) }
          </div>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

export default Home;