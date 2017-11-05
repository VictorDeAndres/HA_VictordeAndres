import React from 'react';

import PropertyInfo from './property-info';

class PropertyCard extends React.Component {
    render() {
        return (
            <li>
                <div className="card">
                    <div className="card--image">
                        <img src={this.props.image} width="100%" height="100%" />
                    </div>
                    <PropertyInfo
                        price={this.props.price}
                        bed={this.props.bed}
                        bath={this.props.bath}
                        rating={this.props.rating}
                        ratingCount={this.props.ratingCount}
                    />
                </div>
            </li>
        );
    }
}

export default PropertyCard;
