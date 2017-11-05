import React from 'react';

class PropertyRatingInfo extends React.Component {

    renderRatingStar(__pos) {
        switch (true) {
            case (Number(__pos) <= Number(this.props.rating)):   // Full
                return <div className="card--text--review--start__full" />;
            case (Number(__pos - 0.5) === this.props.rating):  // Half
                return <div className="card--text--review--start__half" />;
            case (Number(__pos) > Number(this.props.rating)):      // Empty
                return <div className="card--text--review--start__empty" />;
            default:
                return <div />;
        }
    }

    render() {
        return (
            <div className="card--text--row">
                <div className="card--text--review">
                    {this.renderRatingStar(1)}
                    {this.renderRatingStar(2)}
                    {this.renderRatingStar(3)}
                    {this.renderRatingStar(4)}
                    {this.renderRatingStar(5)}
                    <div className="card--text--review--text">
                        {this.props.ratingCount} reviews
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyRatingInfo;

