import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Request from '../Request';
import Header from '../Partials/Header';
import SearchForm from '../Partials/Search';
import Weather from '../Partials/Weather';
import Footer from '../Partials/Footer';

class Search extends Component {
  state = {
    loader: true,
    searching: true,
    results: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.text !== prevProps.match.params.text) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { match } = this.props;

    this.setState({ loader: true, searching: true });

    Request.getWeatherBySearch(match.params.text)
      .then(cities => {
        this.setState({ results: cities });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({ loader: false, searching: false });
      });
  };

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
    const { results, loader, searching } = this.state;
    const { history, match } = this.props;

    return (
      <Fragment>
        <Header />

        <main role="main" className="container">
          <SearchForm text={match.params.text} history={history} />

          <div className="row mt-4">
            <div className="col-md-12">
              <div className={loader ? '' : 'd-none'}>
                <span><i className="fa fa-spin fa-circle-o-notch" /> {`Searching for "${match.params.text}"`}</span> &nbsp;
              </div>
              <h2>{results.length} results for <span style={{ color: 'red'}}>{match.params.text}</span></h2>

              <div className={`alert alert-warning mt-4 ${!searching && results.length < 1 ? '' : 'd-none'} `}>
                No results were found. Try changing the keyword!
              </div>
            </div>
          </div>

          <div className="row">
            { results.map(city => <Weather key={city.woeid} city={city.title} woeid={city.woeid} history={history} />) }
          </div>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

Search.defaultProps = {};

Search.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Search;
