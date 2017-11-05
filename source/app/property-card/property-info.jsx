import React from 'react';

import PropertyRatingInfo from './property-info-rating';

class PropertyInfo extends React.Component {
    render() {
        return (
            <div className="card--text">
                <div className="card--text--row">
                    <div className="card--text--description">
                        <h4 className="card--text--description--price">$ {this.props.price}</h4>
                        <h6 className="card--text--description--average">avg/night</h6>
                    </div>
                </div>
                <div className="card--text--row">
                    <div className="card--text--feature">
                        <h6 className="card--text--feature--data">{this.props.bed} Beds · {this.props.bath} Bathrooms · Sleep {parseInt(this.props.bed * 1.5)}</h6>
                    </div>
                </div>
                <PropertyRatingInfo
                    rating={this.props.rating}
                    ratingCount={this.props.ratingCount}
                />
            </div>
        );
    }
}

export default PropertyInfo;

