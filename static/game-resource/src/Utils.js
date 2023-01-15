export class Utils {
    getAngleFromVector(x, y){
		var angle = Math.atan2(y, x); 
		var degrees = (180 * angle) / Math.PI;

		return (360 + Math.round(degrees)) % 360;
	}

    getDistanceBetweenPoints(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }
}

export default new Utils()