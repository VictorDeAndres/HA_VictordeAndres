import React from 'react';

class OrderProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedField: props.selectedField,
            field: props.field,
            desc: props.orderDesc
        };
        this.clickOrder = this.clickOrder.bind(this);
    }

    clickOrder(){
        this.props.callbackOrder(
            this.state.field,
            !this.state.desc
        );
        this.setState({ 
            desc: !this.state.desc
        });
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className={"order--content " + (this.props.field === this.props.selectedField ? 'order--content__selected' : 'order--content__unselected')} onClick={this.clickOrder}>
                <div className="order--text">
                    {this.props.label}
                </div>
                <div className={"order--direction " + (this.state.desc ? 'order--direction__desc' : 'order--direction__asc')}/>
            </div>
        );
    }
}

export default OrderProperties;

