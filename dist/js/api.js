'use strict';

(function () {

  var Poller = function Poller() {
    this.defaults = {
      type: 'houses',
      limit: 10
    };

    this.items = {
      houses: ['Luxury Home Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod', 'Luxury Home tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'Luxury Home quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo', 'Luxury Home consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse', 'Luxury Home cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non', 'Luxury Home exercitation ullamco laboris nisi ut aliquip ullamco laboris', 'Luxury Home deserunt mollit anim id est laborum', 'Luxury Home mollit anim id est laborum laboris nisi ut aliquip ex ea commodo', 'Luxury Home qui officia deserunt mollit anim id est laborum amet, consectetur adipisicing elit, sed do eiusmod', 'Luxury Home ipsum dolor sit amet, consectetur deserunt mollit anim id est laborum'],
      condos: ['Fancy Condo Bacon ipsum dolor amet pastrami chicken venison, meatball alcatra pork belly short ribs', 'Fancy Condo Short loin alcatra tail beef burgdoggen hamburger spare ribs meatball kevin sirloin leberkas pork loin prosciutto shankle bresaola', 'Fancy Condo Sirloin jerky landjaeger leberkas jowl tongue salami capicola sausage cow hamburger picanha ball tip meatball corned beef', 'Fancy Condo Leberkas fatback meatloaf kielbasa bresaola biltong jowl turkey sausage rump', 'Fancy Condo Pork chop chuck shank jowl landjaeger', 'Fancy Condo Ground loin alcatra tail beef burgdoggen hamburger cupim turducken ham hock venison kielbasa', 'Fancy Condo cupim turducken ham hock venison kielbasa tail beef burgdoggen hamburger', 'Fancy Condo venison kielbasa beef burgdoggen hamburger spare', 'Fancy Condo jerky landjaeger leberkas, cupim turducken ham hock venison kielbasa', 'Fancy Condo sirloin capicola, Short loin alcatra tail beef venison kielbasa']
    };
  };

  Poller.prototype._getRandomNumber = function (minValue, maxValue) {
    return Math.round(parseFloat(Math.min(minValue + Math.random() * (maxValue - minValue), maxValue).toFixed(2)) * 2) / 2;
  };

  Poller.prototype._getData = function (type) {
    var item, i, len;
    var list = this.items[type] || [];
    var results = [];

    for (i = 0, len = list.length; i < len; i++) {
      item = list[i];

      results.push({
        title: item,
        rating: this._getRandomNumber(0, 5),
        ratingCount: Math.floor(Math.random() * 50) + 1,
        price: Math.floor(Math.random() * 300) + 100,
        beds: Math.floor(Math.random() * 5) + 1,
        bath: Math.floor(Math.random() * 5) + 1,
        sqFeet: Math.floor(Math.random() * 3000) + 1500
      });
    }
    return results;
  };

  Poller.prototype._processData = function (data, limit) {
    return data.slice(0, limit);
  };

  Poller.prototype.poll = function (options, cb) {
    var _this = this;

    var self = this;
    var config = Object.assign({}, this.defaults, options);

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var payload = this._processData(this._getData(config.type), config.limit);

        cb && cb(payload);
        resolve(payload);
      }.bind(_this), _this._getRandomNumber(400, 2000));
    });
  };

  if (window.propertyAPI == null) {
    window.propertyAPI = {
      Poller: Poller
    };
  }
})();