import React from 'react';

import PropertyCard from './property-card/property-card';
import _ from 'lodash';

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propertiesList: []
        };
        this.loopTime = 15;
        this.loadingProperties = false;
    }

    componentDidMount() {
        this.getProperties(); // First Render

        // Render every 15 secs
        setInterval(() => {
            if (this.decreasesTime() === 0) {
                this.getProperties();
            }
        }, 1000
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.propertiesList.length !== 0 ) { // Have data in array 
            this.setState({
                propertiesList: this.orderProperties(
                    this.state.propertiesList,
                    nextProps.orderField,
                    nextProps.desc)
            });
        }
    }

    initCount() {
        const secRepeat = 15;
        return secRepeat;
    }

    decreasesTime() {
        this.loopTime--;
        return this.loopTime;
    }

    orderProperties(__properties, __orderby, __desc) {
        const orderType = __desc ? 'desc' : 'asc';
        __properties = _.orderBy(__properties, [__orderby], [orderType]);
        this.loopTime = 15; // Reset loop time
        return __properties;
    }

    addUniqueID(__properties) {
        let uniqueID = -1;
        __properties.map(property => {
            uniqueID++;
            property.id = uniqueID;
            property.image = `./images/${Math.floor(Math.random() * 9) + 1}.jpg`;   // Add random image
            return property;
        });
        return __properties;
    }

    initializeStates() {
        this.setState({ propertiesList: [] });
        this.props.callbackParent(true);
    }

    getProperties() {
        this.initializeStates();

        let properties = [];
        const api = new window.propertyAPI.Poller();

        const getHouses = api.poll({ type: 'houses' })
            .then(responseHouses => {
                properties = properties.concat(responseHouses);
            });

        const getCondos = api.poll({ type: 'condos' })
            .then(responseCondos => {
                properties = properties.concat(responseCondos);
            });

        Promise.all([getHouses, getCondos]).then(() => {
            properties = this.orderProperties(properties, this.props.orderField);
            this.setState({ propertiesList: this.addUniqueID(properties) });
            this.props.callbackParent(false);
            this.loopTime = 15;
        });

        return properties;
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.propertiesList.map(renderRow => {
                            return <PropertyCard
                                key={renderRow.title}
                                price={renderRow.price}
                                bed={renderRow.beds}
                                bath={renderRow.bath}
                                rating={renderRow.rating}
                                ratingCount={renderRow.ratingCount}
                                image={renderRow.image}
                            />
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Properties;

