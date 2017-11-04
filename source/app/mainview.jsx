import React from 'react';

import Properties from './properties';

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true
        };
    }

    onUpdateProperties(__state) {
        this.setState({ isLoading: __state });
    };

    render() {
        return (
            <div className="container">

                <div className={"loading  " + (this.state.isLoading ? 'loading--visible' : 'loading--hidden')}>
                    <div className="loading--spinner">
                        <img src="./images/spinner.gif" width="100%" height="100%"/> 
                    </div>
                    <div className="loading--text">
                        ... actualizando datos ...
                    </div>
                </div>

                <div className={"header"}>
                    <div className="loading">
                        <div className="loading--spinner">
                            <img src="./images/spinner.gif" width="100%" height="100%"/> 
                        </div>
                        <div className="loading--text">
                            ... actualizando datos ...
                        </div>
                    </div>
                </div>
                <div className="main">
                    <Properties 
                        callbackParent={(__state) => this.onUpdateProperties(__state) } 
                    />
                </div>
            </div>
        );
    }
}

export default MainView;

