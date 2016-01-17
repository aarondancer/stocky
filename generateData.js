var faker = require('faker');
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var points = [];
var price = getRandomInt(1,500);
var held = getRandomInt(1,5000);

for (var i = 0; i < 3000; i++) {
	var d = faker.date.recent();
	points.push({
		date: Number(d.getUTCFullYear().toString() + pad(d.getUTCMonth()+1, 2) + pad(d.getUTCDay()+1, 2) + pad(d.getUTCHours(), 2) + pad(d.getUTCMinutes(), 2) + pad(d.getUTCSeconds(), 2))
	})
}

points.sort(function(a, b) {
	return b.date - a.date;
});

function flunctuate(value, max) {
	var v = value * (1 + (getRandomInt(-5,5) / 100));
	if (v <= 0) {
		value * (1 + (getRandomInt(3,5) / 100));
	} else if (v >= max) {
		value * (1 + (getRandomInt(-3,-5) / 100));
	}
	return v;
}

for (var j = 0; j < points.length; j++) {
	price = flunctuate(price).toFixed(3);
	held = Math.ceil(flunctuate(held, 5000));
	points[j].price = price;
	points[j].held = held;
}

var json = points;
var fields = Object.keys(json[0]);
var csv = json.map(function(row){
  return fields.map(function(fieldName){
    return (row[fieldName] || '');
  });
});
csv.unshift(fields); // add header column

console.log(csv.join('\r\n'));
