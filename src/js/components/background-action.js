var num = Math.floor(Math.random() * 6);

if (num == 5) {
	var canvas = document.createElement('canvas');
	canvas.style.position = 'fixed';
	canvas.style.zIndex = '-100';
	canvas.setAttribute('id','canvas');
	document.body.style.backgroundColor = 'black';
	document.body.prepend(canvas);

	var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onreadystatechange = function () {
       if (this.readyState == 'complete') laserShow();
    }
    script.onload = laserShow;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/random-js/1.0.8/random.min.js';
    head.appendChild(script);
	
}
else {
	document.body.classList.add('cray-cray-bg-' + num);
}

function laserShow() {
	var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	var r = new Random(Random.engines.mt19937().autoSeed());

	class Vector2{
	    constructor(x = 0, y = 0){

	        this.x = x;
	        this.y = y;

	    }

	    reset(x = 0, y = 0){

	        this.x = x;
	        this.y = y;

	    }
	}

	class Line{
	    constructor(x1, y1, x2, y2, color, laser, index){

	        this.start = new Vector2(x1,y1);
	        this.end = new Vector2(x2,y2);
	        this.color = color;
	        this.laser = laser;
	        this.index = index;
	        this.counter = 0;

	    }

	    update(){

	        laserStates[this.laser.state].call(this);

	        this.color += 1;

	        this.color = this.color % 360;

	    }

	    draw(){

	        ctx.strokeStyle = 'hsl('+(this.color)+', 50%, 50%)';
	        ctx.beginPath();
	        ctx.moveTo(this.start.x + this.laser.x, this.start.y + this.laser.y);
	        ctx.lineTo(this.end.x + this.laser.x, this.end.y + this.laser.y);
	        ctx.closePath();
	        ctx.stroke();

	    }
	}

	var laserStates = [];

	laserStates[0] = function(){

	    this.end.y += Math.sin((15)) * 2 * this.index + 10;

	    this.counter += 0.1;
	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[1] = function(){

	    this.end.y += Math.sin((this.index / 8)) * this.index + 10;
	    this.end.x += Math.cos((this.index / 8)) * this.index + 10;


	    this.counter += 0.001;
	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[2] = function(){

	    this.end.y += Math.sin((this.index / 4)) * this.index + 40;

	    this.counter += 0.1;
	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[3] = function(){

	    this.end.y += Math.sin((this.index / 2)) * 20 * this.index + 10;
	    this.end.x += Math.cos((this.index / 2)) * 20 * this.index + 10;

	    this.counter += 0.1;
	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[4] = function(){

	    this.end.y += Math.sin(this.counter + (Math.PI * 2)) * (20 * this.index + 10);
	    this.end.x += Math.cos(this.counter + (Math.PI * 2)) * (20 * this.index + 10);

	    if(this.index % 2 == 0){
	        this.counter += (this.laser.index + 1) / 4;
	    } else{
	        this.counter -= (this.laser.index + 1) / 4;
	    }

	    this.counter = this.counter % (Math.PI * 2);

	}


	laserStates[5] = function(){

	    this.end.y += Math.sin(this.counter + (Math.PI * 2)) * (2 * this.index + 1);
	    this.end.x += Math.cos(this.counter + (Math.PI * 2)) * (2 * this.index + 1);

	    if(this.index % 2 == 0){
	        this.counter += ((this.laser.index + 1) / this.index) / 2;
	    } else{
	        this.counter -= ((this.laser.index + 1) / this.index) / 2;
	    }

	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[6] = function(){

	    this.end.y += Math.sin(this.counter + (Math.PI * 2)) * (Math.cos((this.index) * this.counter) * 20);

	    this.counter += ((this.laser.index + 1) / this.index) / 8;
	    this.counter = this.counter % (Math.PI * 2);

	}


	laserStates[7] = function(){

	    this.end.y += Math.sin(this.counter + (Math.PI * 2)) * (Math.cos((this.index) * this.counter) * 20);
	    this.end.x += Math.cos(this.counter + (Math.PI * 2)) * (Math.sin((this.index) * this.counter) * 10);

	    this.counter += ((this.laser.index + 1) / this.index) / 8 ;
	    this.counter = this.counter % (Math.PI * 2);

	}

	laserStates[8] = function(){

	    this.end.y += Math.sin(this.counter + (Math.PI * 2)) * (Math.cos(((this.laser.index + 1) / this.index) * this.counter) * 20);
	    this.end.x += Math.cos(this.counter + (Math.PI * 2)) * (Math.sin(((this.laser.index + 1) / this.index) * this.counter) * 10);

	    this.counter += ((this.laser.index + 1) / this.index) / 8;
	    this.counter = this.counter % (Math.PI * 2);

	}

	class Laser{
	    constructor(width, height, index){

	        this.lines = [];
	        this.quantity = r.integer(15, 20);
	        this.x = r.integer(0, canvas.width);
	        this.y = 0;
	        this.width = width;
	        this.height = height;
	        this.centerX = (this.width / 2);
	        this.state = r.integer(0, laserStates.length- 1);
	        this.color = r.integer(0, 360);
	        this.index = index;
	        this.tick = 0;
	        this.timer = r.integer(60, 160);

	        for (let i = 0; i < this.quantity; i++) {
	            this.lines.push(new Line(this.centerX, this.height, (i * ( this.width / this.quantity) ), 20, this.color + (i * 2), this, i));
	        };

	    }

	    reset(){
	        this.state = r.integer(0, laserStates.length- 1);
	        this.blink = false;
	        this.tick = 0;
	        this.x = r.integer(-100, canvas.width);
	        this.width = r.integer(-200, canvas.width);
	        this.height =  r.integer(100, canvas.height);
	        this.timer = r.integer(60, 160);
	        this.color = r.integer(0, 360);

	        for (let i = 0; i < this.quantity; i++) {
	            this.lines[i].end.x = (i * ( this.width / this.quantity) );
	            this.lines[i].end.y = r.integer(10, 60);
	            this.lines[i].color = this.color;
	        };
	    }

	    update(){

	        for (let i = 0; i < this.quantity; i++) {
	            this.lines[i].update();
	        };


	        if(this.tick >= this.timer){
	            this.reset();
	        }

	        this.tick+=1;

	    }

	    draw(){

	        for (let i = 0; i < this.quantity; i++) {
	            this.lines[i].draw();
	        };

	    }
	}

	var lasers = [];

	function init(){
	    lasers.length = 0;
	    for (let i = 0; i < 8; i++) {
	        lasers.push(new Laser(r.integer(200, canvas.width), r.integer(100, canvas.height), i));
	    };

	}

	function update(){
	    requestAnimationFrame(update);

	    canvas.width = canvas.width;


	    for (let i = 0; i < lasers.length; i++) {
	        lasers[i].update();
	    };

	    ctx.globalCompositeOperation = 'lighter';

	    for (let i = 0; i < lasers.length; i++) {
	        lasers[i].draw();
	    };

	    ctx.globalCompositeOperation = 'source-over';

	}

	init();
	update();

	canvas.onclick = function(){
	    init();
	} 

	window.addEventListener('resize', function(){
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	},false);
}