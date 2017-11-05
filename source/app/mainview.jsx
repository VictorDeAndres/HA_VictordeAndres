import React from 'react';

import Properties from './properties';
import OrderProperties from './orderProperties';

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderField: 'rating',
            orderDesc: true
        };
    }

    onUpdateProperties(__state) {
        this.setState({ isLoading: __state });
    };

    onUpdateOrder(__field, __desc){
        this.setState({ 
            orderField: __field,
            orderDesc: __desc
        });
    }

    renderOrderField(__label, __field){
        const orderDesc = this.state.orderField === __field ? true : false;
        return (
            <div className={"order " + (this.state.isLoading ? 'order__hidden' : 'order__visible')}>
                <OrderProperties 
                    label = { __label}
                    field = { __field }
                    selectedField = { this.state.orderField }
                    orderDesc = { orderDesc }
                    callbackOrder = { (__field, __desc) => this.onUpdateOrder(__field, __desc)}
                />
            </div>
        );

    }

    render() {
        return (
            <div className="container">
                <div className={"loading " + (this.state.isLoading ? 'loading__visible' : 'loading__hidden')}>
                    <div className="loading--spinner">
                        <img src="./images/spinner.gif" width="100%" height="100%" />
                    </div>
                    <div className="loading--text">
                        ... actualizando datos ...
                    </div>
                </div>

                <div className={"orders " + (this.state.isLoading ? 'orders__hidden' : 'orders__visible')}>
                    {this.renderOrderField('orderna por rating', 'rating')}
                    {this.renderOrderField('orderna por precio', 'price')}
                    {this.renderOrderField('orderna por camas', 'beds')}
                </div>

                <div className="properties">
                    <Properties
                        callbackParent = { (__state) => this.onUpdateProperties(__state) }
                        orderField = { this.state.orderField}
                        desc = { this.state.orderDesc} 
                    />
                </div>
            </div>
        );
    }
}

export default MainView;

