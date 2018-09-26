import { connect } from 'react-redux';

import './breadcrumb.scss';

const Breadcrumb = ({ categories=[] }) => {
    return(
        <ul className="breadcrumb">
            { categories.map((category, i) =>
                <li className="breadcrumb-item" key={i}>{category}</li>
            )}
        </ul>
    )
}

function mapStateToProps (state) {
    const { results } = state;
    const { categories } = results;
    return { categories }
}

export default connect(mapStateToProps)(Breadcrumb);