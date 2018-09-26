import React from 'react';
import {connect} from 'react-redux';
import { fetchResults } from "../store";
import router from 'next/router';

import Search from '../components/search/search';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import Result from '../components/result/result';

import '../lib/layout.scss';

class Index extends React.Component {

  static async getInitialProps ({ req, reduxStore }) {
    if ('search' in req.query) {
      await reduxStore.dispatch(fetchResults(req.query.search));
    }
    return {}
  }

  async handleSubmit(e) {
    e.preventDefault();
    const search = e.target[0].value;
    const { dispatch } = this.props;
    await dispatch(fetchResults(search));
    router.push({
      pathname: '/',
      query: { search }
    }, 'items?search='+search, {
      shallow: true
    })
  }

  render () {
    const { router, items } = this.props;
    return (
      <div>
        <Search handleSubmit={(e) => { this.handleSubmit(e) }} />
        <div className="content">
          <Breadcrumb/>
          <div className="results">
            { items && items.map((item, i) =>
              <Result key={i} {...item} />
            ) }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { results } = state
  const items = results.items;
  return { items };
}

export default connect(mapStateToProps)(Index)