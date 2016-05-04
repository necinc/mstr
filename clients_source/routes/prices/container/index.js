import React, { Component, PropTypes } from 'react';
import { Header, PriceList } from '../components/';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { resetPriceView } from '../../price/actions';

class PricesContainer extends Component {
  constructor() {
    super();

    this.fetchPrices = this.fetchPrices.bind(this);
    this.fetchPriceById = this.fetchPriceById.bind(this);
  }

  scrollHandler(event) {
    let { scrollingElement } = event.target;
    let { body } = document;
    if (scrollingElement.scrollTop !== 0) {
      body.className = "scrolled shadowed";
    } else {
      body.className = "scrolled";
    }
  }

  componentWillMount() {
    document.body.className = "scrolled";
    window.addEventListener('scroll', this.scrollHandler, false);

    let { price } = this.props;
    if (price.view.removingSuccess) {
      console.info('Price is removed successfully, reseted price view, show notification');
      this.props.dispatch(resetPriceView());

      let notificationMessage = `Каталог "${price.data.name}" успішно видалений`
      console.log(notificationMessage);
      //this.props.dispatch(showNotification('success', notificationMessage));
    }
  }

  componentWillUnmount() {
    document.body.className = "";
    window.removeEventListener('scroll', this.scrollHandler);
  }

  fetchPrices(flag) {
    this.props.dispatch(actions.fetchPrices(flag));
  }

  fetchPriceById(id) {
    this.props.dispatch(actions.fetchPriceById(id));
  }

  render() {
    let { prices, location, children } = this.props;
    let actionsForComponents = {
      fetchPrices: this.fetchPrices,
      fetchPriceById: this.fetchPriceById
    }

    let pn = location.pathname;
    if ((pn === '/prices/' || pn === 'prices/')  && children === null) {
      return (
        <div className="prices content">
          <Header />
          <PriceList
            data={prices.data}
            view={prices.view}
            actions={actionsForComponents}
          />
        </div>
      );
    } else if ((pn === '/prices/new/' || pn === 'prices/new/') && children) {
      return (
        <div className="prices content">
          {children}
        </div>
      );
    } else {
      return (
        <p style={{textAlign: 'center'}}>
          some error
        </p>
      );
    }
  }
}

function select(state) {
  return {
    prices: state.prices,
    price: state.price
  };
}

export default connect(select)(PricesContainer);
