let canvas = document.getElementById('main__canvas');
let ctx = canvas.getContext('2d');

canvas.width = innerWidth; //Devuelve la anchura de pixeles de area de contenido: https://www.aprenderaprogramar.com/index.php?option=com_content&view=article&id=861:objeto-window-javascript-propiedades-innerwidth-name-outerheight-pagexoffset-screenx-top-cu01173e&catid=78&Itemid=206
canvas.height = innerHeight; // Devuelve la altura de pixeles de area de contenido

let colors = [ //Creamos un array con varios colores
	'#ff5959',
	'#facf5a',
	'#49beb7'
];

let gravity = 0.4; //Definimos la gravedad
let friction = 0.96; //Definimos la friccion

function ramdomLocation(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function colorRamdom(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color) { 
  //A veces necesitamos un "plano" para crear muchos objetos del mismo "tipo". 
  //La forma de crear un "tipo de objeto" es utilizar una función de constructor de objeto.
  //https://www.w3schools.com/js/js_object_constructors.asp

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function() { //La funcion para la creacion de las bolas
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	};
}

let ballArray = []; //En este objeto vamos a introducir la cantidad de bolas

function init() {
	ballArray = [];

	for (let i = 0; i < 5; i++) { //Un contador en cual ingresamos el valor de cuantos bolas
		let radius = ramdomLocation(25, 50);
		let x = ramdomLocation(radius, canvas.width - radius);
		let y = ramdomLocation(0, canvas.height - radius);
		let dx = ramdomLocation(-3, 3)
		let dy = ramdomLocation(-2, 2)
	  ballArray.push(new Ball(x, y, dx, dy, radius, colorRamdom(colors)));
	}
}

function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animate();