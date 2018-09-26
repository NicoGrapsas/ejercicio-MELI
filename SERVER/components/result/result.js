import './result.scss';

const Result = ({ picture, price, free_shipping, title  }) =>  {
    return (
        <div className="result-container">
            <div className="result">
                <img src={picture} alt="" className="result-image"/>
                <div className="result-details">
                    <div className="result-price">
                        ${ price.amount }
                        { free_shipping && 
                            <img className="result-shipping"
                                alt=""
                                src="/static/images/ic_shipping.png"
                                srcSet="/static/images/ic_shipping@2x.png 2x"
                            /> 
                        }
                    </div>
                    <a href="#" className="result-title">{ title }</a>
                    <span className="result-location"> Capital Federal </span>
                </div>
            </div>
        </div>
    )
}

export default Result;