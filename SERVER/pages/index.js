import React from 'react';
import {connect} from 'react-redux';
import { fetchResults, fetchProduct, setSearch, setView } from "../store";
import router from 'next/router';
import { matchPath } from 'react-router';

import Search from '../components/search/search';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import Result from '../components/result/result';
import Product from '../components/product/product';

import '../lib/layout.scss';

class Index extends React.Component {

  static async getInitialProps ({ req, reduxStore }) {
    if (req) {
      const search = matchPath(req.path, { path: '/items', exact:true });
      const product = matchPath(req.path, { path: '/items/:id', exact: true });
      
      if (search && 'search' in req.query) {
        await reduxStore.dispatch(fetchResults(req.query.search));
      } else if (product) {
        await reduxStore.dispatch(fetchProduct(product.params.id));
      }
    }
    
    return {}
  }

  async goToIndex(e) { 
    e.preventDefault();

    const { dispatch } = this.props;
    router.push({ 
      pathname: '/' 
    }, 
    '/', { 
      shallow: true
    });

    dispatch(setView('search'));
    dispatch(setSearch(''));
  }

  async goToResults(e) {
    e.preventDefault();

    const search = e.target[0].value;
    if (!search) { return }
    
    const { dispatch } = this.props;
    await dispatch(fetchResults(search));
    
    router.push({
      pathname: '/items?search='+search,
      query: { search }
    }, '/items?search='+search, {
      shallow: true
    });
  }

  async goToProduct(e, pid) {
    e.preventDefault();

    const { dispatch } = this.props;
    await dispatch(fetchProduct(pid));

    router.push(
      { pathname: '/items/'+pid }, 
      '/items/'+pid, 
      { shallow: true }
    )
  }

  render () {
    const { view, items, search, product } = this.props;
    return (
      <div>
        <Search 
          value={search}
          placeholder="Nunca dejes de buscar"
          handleSubmit={(e) => { this.goToResults(e) }}
          handleIndex = { (e) => { this.goToIndex(e) } } 
        />
        <div className="content">
          { view == 'product' || view == 'results' && <Breadcrumb/>  }
          { view == 'product' && <Product {...product} /> }
          { view == 'results' && 
            <div className="results">
              { items && items.map((item, i) =>
                <Result key={i} {...item} onClick={(e, pid) => { this.goToProduct(e, pid); }}/>
              ) }
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { view, search, results, product } = state
  return { view, search, items: results.items, product: product.item };
}

export default connect(mapStateToProps)(Index);