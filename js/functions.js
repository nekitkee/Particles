
//window.onload = init();
var G , friction , speed , boxsize , lightspeed;

window.onload = function(){

	var boxwrap = document.getElementById("boxwrapper");
	boxsize = boxwrap.clientWidth -50;
	var box = document.getElementById("box");
	box.style.width=boxsize+"px";
	box.style.height=boxsize+"px";
	if (boxsize<400)
		for (let t=1;t<=3;t++)
			document.getElementById(`count${t}`).value =5;

}

function generate(){

	var count , weight, size ;
	var sizearr=[7,10,14];
	var color = ["red" , "blue" , "orange"];
	var container = document.getElementById("box");
	lightspeed = boxsize/2;
	G = document.getElementById("gravity").value;
	friction = document.getElementById("friction").value;
	
	for (let t=1;t<=3;t++){
		count = parseInt(document.getElementById(`count${t}`).value , 10);
		weight = parseInt(document.getElementById(`weight${t}`).value , 10);
		size = parseInt(document.getElementById(`size${t}`).value , 10);
		for(let i = 0 ; i < count ; i++){
			var p = document.createElement("div");
			p.className+="particle";
			p.size = sizearr[size-1];
			p.x = Math.random()*boxsize-p.size;
			p.y = Math.random()*boxsize-p.size;
			p.style.left = p.x + "px";
			p.style.top  = p.y + "px";
			p.style.background = color[t-1];
			p.style.height=p.size+"px";
			p.style.width=p.size+"px";
			p.weight = weight;
			p.vx=0;
			p.vy=0;
			container.appendChild(p);
		}
	}
}

function interact(p1,p2){
	var dX = p1.x - p2.x;
	var dY = p1.y - p2.y;
	var R = Math.sqrt(dX**2+dY**2);
	var F = G*p1.weight*p2.weight/R**2;
	var polar = (p1.style.background == p2.style.background)?1:-1;
	p1.vx += dX/R*F/p1.weight*polar;
	p1.vy += dY/R*F/p1.weight*polar;
	p2.vx -= dX/R*F/p2.weight*polar;
	p2.vy -= dY/R*F/p2.weight*polar; 
}

	//TODO: OPTIMISE LOGIC
function update(p){
	//for x
	var nolimx = true;
	var nolimy = true;
	
	if ((p.x + p.vx )> boxsize-p.size){
		nolimx = false;
		p.x=boxsize-p.size;
		if(p.vx > lightspeed)
			p.vx = -lightspeed;
		else
			p.vx=-p.vx;
	}
	if((p.x + p.vx )<0){
		nolimx = false;
		p.x = 0;
		if(p.vx < -lightspeed)
			p.vx = lightspeed;
		else
			p.vx=-p.vx;
	}
	
	//for y
	if ((p.y + p.vy )> boxsize-p.size){
		nolimy = false;
		p.y=boxsize-p.size;
		if(p.vy > lightspeed)
			p.vy = -lightspeed;
		else
			p.vy=-p.vy;
	}
	if((p.y + p.vy )<0){
		nolimy = false;
		p.y = 0;
		if(p.vy < -lightspeed)
			p.vy = lightspeed;
		else
			p.vy=-p.vy;
	}
	if (nolimy)
		p.y+=p.vy;
		
	if(nolimx)
		p.x+=p.vx;
		
	if (( p.x==0 ||p.x==(boxsize-p.size) )&& ( p.y==0 ||p.y==(boxsize-p.size) )){
		p.x = Math.random()*boxsize-p.size;
		p.y = Math.random()*boxsize-p.size;
	}
	p.style.left = p.x + "px";
	p.style.top = p.y + "px";
	//friction
	p.vy = p.vy*friction;
	p.vx = p.vx*friction;
}

function process(){
	var particles = document.getElementsByClassName("particle"); 
	
	for (let i = 0; i < particles.length-1 ; i++)
		for( let j = i+1; j < particles.length ; j++)
			interact(particles[i] , particles[j]);

	for (let i = 0; i < particles.length ; i++)
			update(particles[i]);	
}

function updatespeed(value){
	speed = 50-value;
	clearInterval(t);
	t = setInterval(process,speed);
}

var t ;
function start(){
	generate();
	speed = parseInt(document.getElementById("speed").value , 10);
	speed = 50-speed;
	t = setInterval(process,speed);	
}

function stop(){
	clearInterval(t);
	//del all particles
	var particles = document.getElementsByClassName("particle"); 
	while(particles.length > 0)
		particles[0].parentNode.removeChild(particles[0]);
}
		
	