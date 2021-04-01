/* click the canvas */

var element,
    canvas,
    width,
    height,
    red;

black = {
    r: 0,
    g: 0,
    b: 0,
    a: 255
};

white = {
    r: 255,
    g: 255,
    b: 255,
    a: 255
};

// init canvas
element = $('#canvas').get(0);
canvas = element.getContext('2d');
width = element.width;
height = element.height;
canvas.fillStyle = '#eeeeee';
canvas.fillRect(0, 0, width, height);

// setpixel
var setPixel = function (x,y,c) {
    var p=canvas.createImageData(1,1);
    p.data[0]=c.r;
    p.data[1]=c.g;
    p.data[2]=c.b;
    p.data[3]=c.a;
    canvas.putImageData(p,x,y);
}

var hasPixelValue = function(x, y) {
	var p = canvas.getImageData(x, y, 1, 1).data;
  return p[0] == 0 ? 1 : 0
}
var rules = [[1,0,0], [0,1,1], [0,1,0], [0,0,1]]
var gotRule = function(rules, cur) {
	for (var i = 0; i < rules.length; i++) {
  	var eq = true
    for (var j = 0; j < cur.length; j++) {
    	if (cur[j] != rules[i][j]) {
      	eq = false
      } 
    }
    if (eq) return true
  }
  return false
}
var applyrules= function(x, y) {
		var cur = [
    	hasPixelValue(x-1, y),
      hasPixelValue(x, y),
      hasPixelValue(x+1, y)
      ];
    if (gotRule(rules, cur)) {
    	setPixel(x, y+1, black)
    }
    
}


setPixel(600, 1, black)
for (var y = 1; y <1199; y++)  {
	for (var x = 1; x < 1199; x++)  {
  	applyrules(x, y)
  }
}

$('#canvas').on('click',

function (e) {
    setPixel(e.offsetX, e.offsetY, black);
});