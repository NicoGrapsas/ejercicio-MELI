import { connect } from 'react-redux';

import './product.scss';

const Product = ({id, title, price, picture, condition, free_shipping, sold_quantity, description}) => {
    return (
        <div className="product-container">
            <div className="product-description-container">
                <img src={picture} alt="" className="product-image"/>
                <div className="product-description-title">Descripcion del producto</div>
                <span className="product-description">{description}</span>
            </div>
            <div className="product-details">
                <p className="product-condition">{ condition == 'new' ? 'Nuevo' : 'Usado'  }{ ` - ${sold_quantity} vendidos` }</p>
                <p className="product-title">{title}</p>
                <div className="product-price">$ { price.amount }<sup className="product-decimals">{ price.decimals + '0' }</sup></div>
                <div className="product-buy">Comprar</div>
            </div>
            
        </div>
    );
}

export default Product;