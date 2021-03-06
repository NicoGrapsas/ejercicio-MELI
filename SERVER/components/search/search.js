import { Component } from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import './search.scss';

class Search extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    resetForm() {
        this.inputRef.current.value = '';
    }

    render() {
        return (
            <nav className="search-container">
                    <a className="site-logo-link" onClick={e => { this.resetForm(); this.props.handleIndex(e) }}>
                        <img 
                            className="site-logo" 
                            src="/static/images/Logo_ML.png"
                            srcSet="/static/images/Logo_ML@2x.png 2x"
                            alt=""
                        />
                    </a>
                <form action="#" className="search-form" onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input type="text" className="search-input" 
                        placeholder={this.props.placeholder} 
                        defaultValue={this.props.value}
                        ref={this.inputRef}
                    />
                    <i className="search-input-addon" ></i>
                </form>
            </nav>
        );
    }
}

export default connect()(Search);