import Link from 'next/link';

import './result.scss';

const Result = ({ id, picture, price, free_shipping, title, onClick  }) =>  {
    const itemURL = `/items/${id}`;
    return (
        <div className="result-container">
            <div className="result">
                    <a href={itemURL} onClick={(e) => { onClick(e, id) }}>
                        <img src={picture} alt="" className="result-image"/>
                    </a>
                <div className="result-details">
                    <div className="result-price">
                        ${ price.amount.toLocaleString() }
                        { free_shipping && 
                            <img className="result-shipping"
                                alt=""
                                src="/static/images/ic_shipping.png"
                                srcSet="/static/images/ic_shipping@2x.png 2x"
                            /> 
                        }
                    </div>
                    <a className="result-title" href={itemURL} onClick={(e) => onClick(e, id)}>{ title }</a>
                    <span className="result-location"> Capital Federal </span>
                </div>
            </div>
        </div>
    )
}

export default Result;