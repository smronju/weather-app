import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  searchTextRef = React.createRef();

  handleSubmit = event => {
    const { history } = this.props;
    event.preventDefault();

    history.push(`/search/${this.searchTextRef.current.value.toLowerCase()}`);
  };

  render() {
    const { text } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input ref={this.searchTextRef} type="text" className="form-control" placeholder={text} />

          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Search</button>
          </div>
        </div>
      </form>
    );
  }
}

Search.defaultProps = {
  text: 'City name e.g Dhaka',
};

Search.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default Search;
