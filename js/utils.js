function generateLocation(target, area){
	var point = {x:0, y:0, loc:0};
	point.loc = Math.floor(Math.random() * 4);
	return generatePointWithLocation(point, target, area, point.loc);
}

function generatePointWithLocation(point, target, area, loc){
	if (loc <= 1){
		point.x = getRandomInt(target.width, area.width - target.width);
		point.y = (point.loc == 0)? -target.height : area.height + target.height;
	} else {
		point.x = (point.loc == 2)? -target.width : area.width + target.width;
		point.y = getRandomInt(target.height, area.height - target.height);
	}
	return point;
}

function generatePointInArea(area){
	var point = {x:0, y:0};
	point.x = getRandomInt(0, area.width);
	point.y = getRandomInt(0, area.height);
	return point;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}