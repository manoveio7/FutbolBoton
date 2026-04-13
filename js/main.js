var main = {
	key: 'main',
	active: false,
	create: inicio,
	update: actualiza,
	extends: Phaser.Scene
};

var fondo;
var cam;
var flecha;
var estaEscena;
var arcos;
var jugA;
var nombre1;
var nombre2;
var pelota;
var RESPLANDOR;
var distancia;
var limite1;
var limite2;
var limite3;
var limite4;
var limite5;
var limite6;
var LIMITADORES;
var gol;
var tempGol1;
var tempGol2;
var tirar;
var fJUG;
var jues;
var NOM;
var jIndex;
var equipoA;
var noVale;
var jugTocado;
var text;
var textGol1;
var textGol2;
var partPelota;
var contIniciar;
var cartelGol;
var explotaCuete;
var colorGol;
var iniciar;
var res;
var res2;
var revisando;
var fabian;
var roseJug;
var cantJugadores;
var fin;
var cuadradoBlanco;
var cartelFin;
var cartelFin;
var tiempoAmarilla;
var btnReiniciar;

// audios	
var palo;
var turno;
var audioInicio
var audioGol;
var ruidoGol;
var chocaLateral;
var cuetes3;
var audioLoop;
var GENTES;
var casiGol;
var moverJues;
var fau;
var explota;
var victoria;
var noJueguenAsi;
var ahoraVasVer;
var toma;
var desaparece;
var amarillaJues;
var AudiosD;
var tomaAmarilla;
var atencion;

function inicio() {
			// establecer orientacion de pantalla horizontal
		
	//	screen.orientation.lock('landscape');

		//Ocultar barra de estado
//		StatusBar.hide();
	
				
	
	cam = this.cameras.main;
	//this.scale.startFullscreen();
	iniciar = false;
	fin = false;
	gol = true;
	tirar = false;
	noVale = false;
	jugTocado = false;
	tempGol1 = 0;
	tempGol2 = 0;
	contIniciar = 0;
	revisando = false;
	roseJug = true;
	tiempoAmarilla = false;
	cantJugadores = {a: 0,b: 0};
	AudiosD = [];

	// Asignar Audios
	palo = this.sound.add('palo');
	turno = this.sound.add('turno');
	audioInicio = this.sound.add('inicioJuego');
	audioGol = this.sound.add('audioGol');
	ruidoGol = this.sound.add('ruidoGol');
	cuetes3 = this.sound.add('cuetes3');
	casiGol = this.sound.add('casiGol');
	chocaLateral = this.sound.add('chocaLateral');
	audioLoop = this.sound.add('audioLoop');
	audioLoop.setLoop(true);
	moverJues = this.sound.add('moverJues');
	fau = this.sound.add('fau');
	explota = this.sound.add('explota');
	victoria = this.sound.add('victoria');
	noJueguenAsi = this.sound.add('noJueguenAsi');
	ahoraVasVer = this.sound.add('ahoraVasVer');
	toma = this.sound.add('toma');
	desaparece = this.sound.add('desaparece');
	amarillaJues =  this.sound.add('amarillaJues');
	tomaAmarilla =	this.sound.add('tomaAmarilla');
	atencion =	this.sound.add('atencion');

	for(let i = 0; i < 8; i++)
	{
		let d = this.sound.add('d'+i);
		
		AudiosD.push(d);
	}
	
	GENTES = this.add.group();
	
	for(let i = 0; i < 3; i++)
	{
		let s = this.sound.add('gente'+i);
		GENTES.add(s);
	}
	
	NOM = ['RUBEN',
		'JULIO',
		'SILVIO',
		'FABRICIO',
		'ALBERTO',
		'DANIEL',
		'ERICO',
		'EDGARDO']

	LIMITADORES = [];

	estaEscena = this;
	this.input.addPointer(2);
	this.input.on('pointermove', mover);

	this.input.on('pointerup', soltar);

	cam.setBackgroundColor('rgb(0,0,0)')
	
	
	fondo = this.add.image(0, 0, 'fondo').setOrigin(0)
		.setDisplaySize(cam.width, cam.height)

	equipoA = textHabla.text === 'AZUL' ? true : false;
	//Limitadores...
	crearLimitador(cam.width / 2, cam.height - cam.height / 28, 0.5, 0, cam.width / 1.25, cam.height / 6.8)
	crearLimitador(cam.width / 2, 0, 0.5, 0, cam.width / 1.25, cam.height / 6.8)
	crearLimitador(0, 0, 0, 0, cam.width / 9.4, cam.height / 2.55)
	crearLimitador(cam.width, 0, 1, 0, cam.width / 9.4, cam.height / 2.55)
	crearLimitador(0, cam.height, 0, 1, cam.width / 9.4, cam.height / 3.5)
	crearLimitador(cam.width, cam.height, 1, 1, cam.width / 9.4, cam.height / 3.5)
	crearLimitador(0, 260, 0, 0, cam.width / 20, cam.height / 3, 0x0000ff)
	crearLimitador(cam.width, 260, 1, 0, cam.width / 20, cam.height / 3, 0x0000ff)

	// Limitadores Palo del Arco
	crearLimitador(150, 270, 0.5, 0.5, cam.width / 60, cam.width / 120, 0x4C37D4, 0, 'palo')
	crearLimitador(150, 477, 0.5, 0.5, cam.width / 60, cam.width / 120, 0x4C37D4, 0, 'palo')
	crearLimitador(cam.width - 150, 270, 0.5, 0.5, cam.width / 60, cam.width / 120, 0x4C37D4, 0, 'palo')
	crearLimitador(cam.width - 150, 477, 0.5, 0.5, cam.width / 60, cam.width / 120, 0x4C37D4, 0, 'palo')
	// sensor de gol......
	let gol1 = this.physics.add.image(50, 280, 'cuadro')
		.setImmovable(true)
		.setName('gol1')
		.setOrigin(0, 0)
		.setAlpha(0)
		.setDisplaySize(cam.width / 20, cam.height / 3.5)
		.setTint(0xffff01)

	let gol2 = this.physics.add.image(cam.width - 50, 280, 'cuadro')
		.setImmovable(true)
		.setName('gol2')
		.setOrigin(1, 0)
		.setAlpha(0)
		.setDisplaySize(cam.width / 20, cam.height / 3.5)
		.setTint(0xffff01)
	//=====================================
	jugA = this.add.group();
	RESPLANDOR = this.add.group();
	fJUG = this.add.group();

	for (let i = 0; i < 8; i++) {
		let jug = this.physics.add.image(250, 230, 'j' + i)

		//posicionar jug
		switch (i) {
			case 0:
				jug.x = 580
				jug.y = 375
				break;

			case 1:
				jug.x = 450
				jug.y = 535

				break;

			case 2:
				jug.x = 450
				jug.y = 225

				break;

			case 3:
				jug.x = 250
				jug.y = 375

				break;

			case 4:
				jug.x = 920
				jug.y = 375

				break;

			case 5:
				jug.x = 1250
				jug.y = 375

				break;

			case 6:
				jug.x = 1080
				jug.y = 535

				break;

			case 7:
				jug.x = 1080
				jug.y = 225

				break;
		}

		jug.posIniX = jug.x;
		jug.posIniY = jug.y;

		jug.fau = false;

		jug.i = i;

		if (i < 4)
			jug.equipo = 'A';
		else
			jug.equipo = 'B'

		jugA.add(jug);

		//crear resplandor...
		let res = this.add.image(jug.x, jug.y, 'resplandor')
			.setDisplaySize(cam.width / 10, cam.width / 10)
			.setDepth(1)
			.setAlpha(0);

		RESPLANDOR.add(res);

		// Crear fotos para UI

		let fJug = this.add.image(i < 4 ? 10 : cam.width - 125, 10, 'f' + i)
			.setOrigin(0)
			.setDepth(110)
			.setDisplaySize(118, 95)
			.setAlpha(0)

		fJUG.add(fJug);
	}


	jugA.children.iterate(function (player) {

		player.setDisplaySize(cam.width / 15, cam.width / 15) //= window.innerWidth/2;
		player.setInteractive()
			.setDepth(1)
			.setBounce(0.5)
			.setDrag(0.1)
			.setDamping(true)
			.setFriction(0.05)
			.setCollideWorldBounds();

		player.body.isCircle = true
		player.on('pointerdown', tocando);

	});
	
	//crear el jues y su animacion...
	jues = this.add.image(cam.width/2,-100,'jues')
		.setScale(equipoA === true ? 0.8 : -0.8,0.8)
		.setDepth(100)
		
	res = this.add.image(jues.x,jues.y,'res')
	res.seguirGol = false;
	
	res2 = this.add.image(jues.x,jues.y,'res')
	res2.seguirGol = false;
		
	jues.anim = this.tweens.chain({
		targets: jues,
		tweens:[
			{
				texture: 'jues',
				onStart: retraso(moverJues,500),
				y:350,
				duration: 2000,
				ease: 'Back.easeOut'//'bounce.out'	
			},
			{
				onStart: juesSonido,
				scaleX: equipoA === true ? -0.8 : 0.8,
				duration: 10
			},
			{
				onStart: juesSonido,
				delay: 800,
				scaleX: equipoA === true ? 0.8 : -0.8,
				duration: 10
			},
			{
				delay: 500,
				texture: 'jues2',
			},
			{
				onStart: ()=>{
					estaEscena.time.addEvent({
					delay: 400, // ms
					callback: ()=> {
						desaparece.play();
					},
					paused: false
					});
				},
				delay: 500,
				y:-300,
				duration: 500,
				ease: 'Back.easeIn',
				onComplete: iniciarJuego
			}
			]
	});
		

	flecha = this.add.image(0, 0, 'flecha')
		.setVisible(false)
		.setOrigin(0, 0.5)
		.setDepth(0)
		.setScale(-0.4)

	//	this.scale.startFullscreen();

	pelota = this.physics.add.sprite(750, 370, 'pelota')
		.setScale(5)
		.setAlpha(0)
		.setDepth(2)
		.setBounce(0.3)
		.setDrag(0.3)
		.setDamping(true)
		.setFriction(0.5)
		.setCollideWorldBounds(true);

	pelota.body.isCircle = true
	pelota.body.mass = 0.3;
	pelota.setCollideWorldBounds()
	pelota.body.enable = false;
	
	mascara = this.make.graphics().fillCircle(100, 100, 100)
	.setScale(0.18)
	
	pelota2 = this.add.tileSprite(0, 0,700,700, 'tilePelota')
	.setMask(mascara.createGeometryMask())
	.setDepth(9)
	.setScale(0.18)
	.setAlpha(0)

	particulas();

	arcos = this.add.image(0, 0, 'arcos').setOrigin(0)
		.setDisplaySize(cam.width, cam.height)
		.setDepth(2)



	text = this.add.text(880, 20, 'RUBEN', {
		font: '35px Courier', fill: '#000000', stroke: '#ff0000', strokeThickness: 5, align: 'center'
	}).setOrigin(0.5);
	text.setDepth(100)
		.setAlpha(0);
	text.posA = 420;
	text.posB = 1080;

	textGol1 = this.add.text(620, 30, '0', {
		font: '55px Courier', fill: '#ffc900', stroke: '#ff0000', strokeThickness: 5, align: 'center'
	}).setOrigin(0.5);
	text.setDepth(100)

	textGol2 = this.add.text(875, 30, '0', {
		font: '55px Courier', fill: '#ffc900', stroke: '#ff0000', strokeThickness: 5, align: 'center'
	}).setOrigin(0.5);
	text.setDepth(100)
	
	cartelGol = this.add.image(cam.width/2,cam.height/2,'cartelGol')
	.setDepth(100)
	.setScale(3,0)
	
	fabian = this.add.image(cam.width- 50,1500,'fabian')
	fabian.x = cam.width-fabian.width/2
	fabian.setDepth(10)
	
	amarilla = this.add.image(cam.width/2,cam.height,'amarilla')
	.setOrigin(0.5,1)
	.setScale(1.5)
	.setDepth(99)
	amarilla.y = amarilla.y * 2;
	//Colisionadores.....

	this.physics.add.overlap(gol1, pelota, golaso, null, this)
	this.physics.add.overlap(gol2, pelota, golaso, null, this)
	this.physics.add.collider(jugA, jugA, alertaJug, null, this)
	this.physics.add.collider(jugA, pelota, alertaPelota, null, this)
	this.physics.add.collider(LIMITADORES, pelota, pelotaEnElPalo, null, this)
	this.physics.add.collider(LIMITADORES, jugA)
	
	cuadradoBlanco = this.add.image(cam.width/2,cam.height/2,'cuadradoBlanco')
	.setDisplaySize(cam.width,cam.height)
	.setDepth(111)
	.setTint(0x000000)
	.setAlpha(0)
	
	cartelFin = this.add.image(cam.width/2,cam.height/2-100,'cartelFin')
	.setDepth(112)
	.setScale(10,5)
	.setAlpha(0)
	
	textFin = this.add.text(cam.width/2, cam.height/2-30, 'ROJO', {
		font: '70px arial', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 3, align: 'center'
	}).setOrigin(0.5)
	.setDepth(120)
	.setAlpha(0)
	.setScale(5)
	
	pantRota = this.add.image(0,0,'pantRota')
	.setDepth(122)
	.setOrigin(0)
	.setAlpha(0)
	.setDisplaySize(cam.width,cam.height)

	
	btnReiniciar = this.add.image(cam.width-100,250,'btnReiniciar')
	.setScale(0.5)
	.setDepth(200)
	.setAlpha(0)
	.setInteractive()
	
	
}

function finalizarTodo(){
	fondo.destroy()
	arcos.destroy()
	jues.y = 380;
	
	for(let i = 0; i < 8; i++){
		jugA.children.entries[i].setAlpha(0);
		RESPLANDOR.children.entries[i].setAlpha(0);
		fJUG.children.entries[i].setAlpha(0);
		textGol1.setAlpha(0)
		textGol2.setAlpha(0)
		cartelFin.setAlpha(0)
		estaEscena.cameras.main.fadeIn(1000,0,0,0);
	
	}
}

function mostrarJugFin(a){
	let foto = [];
	
		btnReiniciar.on('pointerdown',()=>{
			btnReiniciar.removeInteractive();
			estaEscena.cameras.main.fadeOut(1000,0,0,0);
		
			estaEscena.cameras.main.once('camerafadeoutcomplete',() => {
			estaEscena.scene.start('Intro');
				//finalizarTodo();
			});									
		});
		
		btnReiniciar.setAlpha(1);
		

	for(let i = 0; i < 8; i++){
		let j = fJUG.children.entries[i];
		if(jugA.children.entries[i].equipo === a){
			j.x = cam.width/2
			j.y = cam.height/2
			j.setDepth(122)
			foto.push(j);
		}
	}
	
	for(let i = 0; i < 4; i++){
		estaEscena.tweens.add({
		targets: foto[i],
		delay: 300*i,
		x: 400 * i,
		y: 400,
		scale: 0.8,
		alpha: 1,
		duration: 300,
		ease: 'Sine.easeInOut',
		});
	}
	
	estaEscena.tweens.add({
		targets: btnReiniciar,
		delay: 1000,
		scaleX: 0.9,
		scaleY: 0.9,
		alpha: 1,
		duration: 1000,
		ease: 'Bounce.easeOut',
		yoyo: true,
		repeat: -1
		});
}

function alertaPelota(a,b){
	a.flipX = !a.flipX;
	jugPelota.play();
	roseJug = false;
}

function retraso(aud,t){
	estaEscena.time.addEvent({
		delay: t, // ms
		callback: ()=> {
			aud.play();
		},
		paused: false
	});
}

function juesSonido()
{
	moverJues.play()
}

function iniciarJuego()
{
	jues.texture = 'jues'
	iniciar = true;
	// Control de audio de gente de fondo...
	controlAudioGente();
	
	//Animacion pelota al centro
	
	estaEscena.tweens.add({
		targets: pelota,
		scale: 0.1,
		alpha: 1,
		duration: 1500,
		ease: 'Sine.easeInOut',
		onComplete: () => {
			//	gol = false;
			pelota.body.enable = true;
			pelota.body.velocity.x = 0;
			pelota.body.velocity.y = 0;
			contIniciar = 0;

			audioInicio.play();
			
			audioLoop.play();
			audioLoop.volume = 0.3;

			audioInicio.on('complete', () => {
				gol = false
				pelota.setAlpha(0);
				pelota2.setAlpha(1);
			})
		}
	});
}


function controlAudioGente(){
	let g = random(0,2);

	GENTES.children.entries[g].play();
	GENTES.children.entries[g].on('complete', () => {
			setTimeout(function() {
				if(fin) return;
			controlAudioGente();	
		}, random(1,3)*1000);
	})
}

function pelotaEnElPalo(a, b) {
	if (a.name === 'palo')
	{
		palo.play();
		casiGol.play();
	}
	else
		chocaLateral.play();

	if(!gol)
		{ 
			if(pelota.x < 170 || pelota.x > 1350)
				pelota.x = 200;

			if(pelota.y < 100 || pelota.y > 650)
				pelota.y = 150;
		}
}

function alertaJug(a, b) {
	a.flipX = !a.flipX;
	jugPelota.play();

	if(!roseJug)
		return;
		
	if(a.equipo !== b.equipo)
	{
		roseJug = false;
		
		//revisar velocidad del golpe jugPelot
		if(Math.abs(a.body.velocity.x) >= 200 || Math.abs(b.body.velocity.x >= 200 || Math.abs(a.body.velocity.y) >= 200 || Math.abs(b.body.velocity.y) >= 200))
		{
			
			let j = a.i === jIndex ? a : b
			let r = RESPLANDOR.children.entries[j.i];
			
			fabian.scaleX = j.x > cam.width/2 ? -1: 1;
			fabian.x = j.x > cam.width/2 ? 0+fabian.width/2 : cam.width-fabian.width/2;
			
			if(r.tint === 0xffff01){
				j.body.velocity.x = 0;
				j.body.velocity.y = 0;
				revisando = true;
				r.setTint(0xff0000);
				r.setAlpha(0.7);
				
				estaEscena.tweens.add({
					targets: r,
					duration: 250,
					scale: 3,
					alpha: 1,
					yoyo: true
				});
				
				estaEscena.tweens.chain({
				targets: jues,
			tweens:[
			{
				texture: 'jues',
				scaleX: j.x > cam.width/2 ? 0.8 : -0.8,
				onStart: retraso(moverJues,500),
				y:350,
				duration: 2000,
				ease: 'Back.easeOut'//'bounce.out'	
			},
			{
				//onStart: juesSonido,
				scaleX: j.x < cam.width/2 ? -0.8 : 0.8,
				duration: 10
			},
			{
				onStart: ()=>{
				/*	estaEscena.group.children.iterate(GENTES =>
    		   {
    		   		GENTES.volume = 0.3
        				
        			});
        		*/
					ahoraVasVer.play();
				},
				delay: 1000,
				y:300,
				duration: 2000,
				ease: 'Elastic'//'bounce.out'	
			},
			{
				
				delay: ahoraVasVer.duration,
				x: j.x,
				y: j.y,
				duration: 1000,
				ease: 'Expo.easeIn',
				onComplete: ()=> {
					pantRota.setAlpha(1)
					
					estaEscena.tweens.add({
							targets: pantRota,
							delay: 3000,
							duration: 3000,
							alpha: 0
					});
					
					explota.play();
					j.setAlpha(0)
					r.setAlpha(0)
					partJugRoja(j)
					estaEscena.cameras.main.shake(300);
				}
			},
				{
				onStart: retraso(toma,6000),	
				x: cam.width/2,
				y: 350,
				duration: 2000,
				ease: 'Expo.easeOut',
				onComplete: ()=> {
					j.removeInteractive();
					j.setPosition(400,-500);
					j.body.velocity.x = 0;
					j.body.velocity.y = 0;
					j.body.enable = false;
					
						if(j.equipo === 'A')
						cantJugadores.a ++;
						
					if(cantJugadores.a >= 4)
						finPartido();
				
					if(j.equipo === 'B')
						cantJugadores.b ++;
					
					if(cantJugadores.b >= 4)
						finPartido();
					
					
					jues.setTexture('jues2');
				}
			},
			{
				onStart: ()=>{
					estaEscena.time.addEvent({
					delay: 400, // ms
					callback: ()=> {
						desaparece.play();
					},
					paused: false
					});
				},
				delay: 500,
				y:-300,
				duration: 500,
				ease: 'Back.easeIn',
				onComplete: ()=> {
				revisando = false;
				}
			}
			]
			});	
			}
		
			else if(!j.fau)
			{
				fau.play();
				j.fau = true;
				noJueguenAsi.play();
				tiempoAmarilla = true;
				
				estaEscena.tweens.add({
					targets: fabian,
					duration: noJueguenAsi.duration*500-1000,
					y: 500,
					hold: 1500,
					yoyo: true,
					ease: 'Expo.easeOut',
					onComplete: ()=>{
						tiempoAmarilla = false;
					}
				});
			}
			else if(j.fau && r.tint === 0xffffff){
				revisando = true;
				
				tiempoAmarilla = true;
				
				atencion.play();
				tomaAmarilla.play();
				
				estaEscena.time.addEvent({
					delay: tomaAmarilla.duration*1000, // ms
					callback: ()=> {
						estaEscena.time.addEvent({
							delay: AudiosD[jIndex].duration*1000, // ms
							callback: ()=> {
								tiempoAmarilla = false;
								revisando = false;
								r.setAlpha(0);
					},
					paused: false
				});
						AudiosD[jIndex].play();
					},
					paused: false
				});
				
				r.setPosition(j.x,j.y);
				r.setTint(0xffff01);
				r.setAlpha(0.7);
				
				estaEscena.tweens.add({
							targets: r,
							duration: 250,
							scale: 3,
							alpha: 1,
							yoyo: true
				});
				
				estaEscena.tweens.add({
					targets: amarilla,
					duration: 1000,
					y: cam.height,
					hold: 1000,
					yoyo: true,
					ease: 'Expo.easeOut'
				});
			
			
			}//ultima llave
		}
	}

}

function tarjetas(a){
	a.setAlpha(0.7).setTint(0xffff01).setPosition(j.x,j.y)
			
	estaEscena.tweens.add({
		targets: a,
		duration: 250,
		scale: 3,
		alpha: 1,
		yoyo: true
	});
}

function actualiza(d, t) {
	if(fin) return;
	
	let velPel = pelota.body.velocity.x;
	pelota2.setPosition(pelota.x - 17.1,pelota.y - 17.1)
	pelota2.tilePositionX -= Math.abs(velPel/12)
	
	pelota2.rotation = pelota.body.angle;
	
	mascara.setPosition(pelota2.x,pelota2.y)
	
	if(res.seguirGol && jIndex !== undefined){
		res.x = fJUG.children.entries[jIndex].x
		res.y = fJUG.children.entries[jIndex].y
		res.angle += 1;
		
		res2.x = fJUG.children.entries[jIndex].x
		res2.y = fJUG.children.entries[jIndex].y
		res2.angle -= 1;
	}
	
	if (revisando || tiempoAmarilla){
		// girar los que tienen tarjeta amarilla...
		for(let i = 0; i < 8; i++)
		{
			let r = RESPLANDOR.children.entries[i];
			
			if(r.alpha > 0)
			r.rotation += 0.001 * t;
			r.setPosition(jugA.children.entries[i].x,jugA.children.entries[i].y);
		}
	}
	
	
	if(!iniciar||revisando)
	{
		res.x = jues.x
		res.y = jues.y;
		res2.x = jues.x
		res2.y = jues.y
		res.angle += 1
		res2.angle -= 1
	}
	
	if(tiempoAmarilla) return;
	
	if(revisando) return;
	
	if(!iniciar) return;

	if (gol) return;

	if (tirar) {
		girarResplandor(t);
		return;
	}

	for (let i = 0; i < 8; i++) {
		if (Math.abs(jugA.children.entries[i].body.velocity.x) > 1 ||
			Math.abs(jugA.children.entries[i].body.velocity.y) > 1 || pelota.body.velocity.x > 1) {

			tirar = false;

			break;
		}

		if (i === 7 && pelota.body.velocity.x < 1) {
			revisarPosJug();
			
			if(revisando) return;
		
			tirar = true;
			roseJug = true;
			
			turno.play();

			if (jIndex !== undefined && !jugTocado) {
				fJUG.children.entries[jIndex].setAlpha(0);
				text.setAlpha(0)

			}
		}
	}
}

function revisarPosJug(){
	let jmp = [];
	
	for(let i = 0; i < 8; i++){
		
		let j = jugA.children.entries[i];
		let r = RESPLANDOR.children.entries[i];
		
		if(j.x <= 170 || j.x >= 1330 ){
			revisando = true;
			
			//Revisar que color es el resplandor del jug
			if(r.tint === 0xffffff)
			{
				r.setAlpha(0.7).setTint(0xffff01).setPosition(j.x,j.y)
			
				estaEscena.tweens.add({
							targets: r,
							duration: 250,
							scale: 3,
							alpha: 1,
							yoyo: true
				});
			//	r.setAlpha(0.7).setTint(0xffff01).setPosition(j.x,j.y)
			
			retraso(fau,200)
		
			jmp.push(jugA.children.entries[i])
			
			jues.scaleX = j.x < 200 ? 0.8 : -0.8;
			
			estaEscena.tweens.chain({
		targets: jues,
		tweens:[
			{
				texture: 'jues',
				scaleX: j.x < 200 ? -0.8 : 0.8,
				onStart: retraso(amarillaJues,500),
				y:350,
				duration: 2000,
				ease: 'Back.easeOut'//'bounce.out'	
			},
			{
				onStart: juesSonido,
				scaleX: j.x < 200 ? -0.8 : 0.8,
				duration: 10
			},
			{
				delay: 1200,
				texture: 'jues2',
			},
			{
				onStart: ()=>{
					estaEscena.time.addEvent({
					delay: 400, // ms
					callback: ()=> {
						desaparece.play();
					},
					paused: false
					});
				},
				delay: 500,
				y:-300,
				duration: 500,
				ease: 'Back.easeIn',
				onComplete: ()=> {
					for(let a = 0; a < jmp.length; a++)
					{	
						let au = AudiosD[jmp[a].i]
							au.play();
					
						estaEscena.tweens.add({
							targets: jmp[a],
							duration: au.duration*1000,
							x: jmp[a].x < 200 ? jmp[a].x + 150 : jmp[a].x - 150,
							y: random(200,550),
							onComplete: () => {
								RESPLANDOR.children.entries[i].setAlpha(0);
								revisando = false;
								jues.texture = 'jues'
								}
						});
					}
				}
			}
			]
	});
			}
			else if(r.tint === 0xffff01)
			{
				//Se da ROJA al jug y lo explotamos
				
				r.setAlpha(0.7).setTint(0xff0000).setPosition(j.x,j.y)
				
				estaEscena.tweens.add({
							targets: r,
							duration: 250,
							scale: 3,
							alpha: 1,
							yoyo: true
				});
			
				retraso(fau,200)
				
				jmp.push(jugA.children.entries[i])
			
				jues.scaleX = j.x < 200 ? 0.8 : -0.8;
				
				estaEscena.tweens.chain({
				targets: jues,
			tweens:[
			{
				texture: 'jues',
				scaleX: j.x < 200 ? -0.8 : 0.8,
				onStart: retraso(moverJues,500),
				y:350,
				duration: 2000,
				ease: 'Back.easeOut'//'bounce.out'	
			},
			{
				//onStart: juesSonido,
				scaleX: j.x < 200 ? -0.8 : 0.8,
				duration: 10
			},
			{
				onStart: ()=>{
					ahoraVasVer.play();
				},
				delay: 1000,
				y:300,
				duration: 2000,
				ease: 'Elastic'//'bounce.out'	
			},
			{
				x: j.x,
				y: j.y,
				duration: 1000,
				ease: 'Expo.easeIn',
				onComplete: ()=> {
					pantRota.setAlpha(1)
					
					estaEscena.tweens.add({
							targets: pantRota,
							delay: 3000,
							duration: 3000,
							alpha: 0
					});
					
					explota.play();
					j.setAlpha(0)
					r.setAlpha(0)
					partJugRoja(j)
					estaEscena.cameras.main.shake(300);
				}
			},
				{
				onStart: retraso(toma,6000),
				x: cam.width/2,
				y: 350,
				duration: 2000,
				ease: 'Expo.easeOut',
				onComplete: ()=> {
					j.removeInteractive();
					j.setPosition(400,-500);
					j.body.velocity.x = 0;
					j.body.velocity.y = 0;
					j.body.enable = false;
					
						if(j.equipo === 'A')
						cantJugadores.a ++;
						
					if(cantJugadores.a >= 4)
						finPartido('B');
				
					if(j.equipo === 'B')
						cantJugadores.b ++;
					
					if(cantJugadores.b >= 4)
						finPartido('A');
					
					jues.setTexture('jues2');
				}
			},
			{
				onStart: ()=>{
					estaEscena.time.addEvent({
					delay: 400, // ms
					callback: ()=> {
						desaparece.play();
					},
					paused: false
					});
				},
				delay: 500,
				y:-300,
				duration: 500,
				ease: 'Back.easeIn',
				onComplete: ()=> {
				revisando = false;
				}
			}
			]
				});
			}	
			
		}
	}
}

function girarResplandor(t) {
	if (tirar && !jugTocado) {
		for (let i = 0; i < 8; i++) {
			if (equipoA && i < 4) {
				if(jugA.children.entries[i].alpha === 0)
					continue;
				RESPLANDOR.children.entries[i].x = jugA.children.entries[i].x
				RESPLANDOR.children.entries[i].y = jugA.children.entries[i].y
				RESPLANDOR.children.entries[i].rotation += 0.001 * t;
				RESPLANDOR.children.entries[i].alpha = 0.7;
			}

			if (!equipoA && i > 3) {
				if(jugA.children.entries[i].alpha === 0)
					continue;
				RESPLANDOR.children.entries[i].x = jugA.children.entries[i].x
				RESPLANDOR.children.entries[i].y = jugA.children.entries[i].y
				RESPLANDOR.children.entries[i].rotation += 0.001 * t;
				RESPLANDOR.children.entries[i].alpha = 0.7;
			}
		}
	} else if (!tirar || jugTocado) {
		for (let i = 0; i < 8; i++) {
			RESPLANDOR.children.entries[i].alpha = 0;
			RESPLANDOR.children.entries[i].rotation = 0;
		}
	}
}

function tocando(t) {

	if (!tirar) return

	if (equipoA && this.equipo === 'B') {
		noVale = true;
		return;
	}

	if (!equipoA && this.equipo === 'A') {
		noVale = true;
		return;
	}


	//Mostrar el Jug y el Nombre...
	jIndex = this.i;
	fJUG.children.entries[jIndex].setAlpha(1)

	text.setText(NOM[jIndex])
	text.setAlpha(1)
	text.x = this.equipo === 'A' ? text.posA : text.posB;
	text.setStroke(this.equipo === 'A' ? '#3C7BE5' : '#ff0000')

	jugTocado = true;

	let dx = t.x - this.x;
	let dy = t.y - this.y;



	distancia = 20;

	let w = cam.width
	let h = cam.height

	let r = Math.atan2(dy, dx);
	flecha.rotation = Math.atan2(dy, dx);
	flecha.setVisible(true)
	flecha.setScale(-0.65)
	flecha.setPosition(this.x, this.y)
}

function mover(t) {

	if (noVale || !tirar) {
		return;
	}

	if (!jugTocado)
		return;

	let thisa = jugA.children.entries[jIndex];

	let dx = t.x - thisa.x;
	let dy = t.y - thisa.y;

	let r = Math.atan2(dy, dx);
	flecha.rotation = r;

	distancia = Math.floor(Math.sqrt(dx * dx + dy * dy));
	// nueva maners de calcular la fistancia..
	// distanceToPointer()
	if (distancia <= 20)
		flecha.setScale(-0.6, -0.6)
	else
		flecha.setScale(-(distancia / 50), -0.6)

	if (distancia >= 80)
		flecha.setScale(-1.5, -0.6)

	flecha.setPosition(thisa.x, thisa.y)
}

function soltar(p) {
	estaEscena.scale.startFullscreen();
	if (noVale || !tirar) {
		noVale = false;
		return;
	}

	if (!jugTocado)
		return;

	tirar = false;
	jugTocado = false;

	flecha.setVisible(false);
	flecha.setScale(-0.65)

	let pu = new Phaser.Math.Vector2(0,
		0)
	pu.x = p.x
	pu.y = p.y

	let pl = jugA.children.entries[jIndex];

	if (distancia >= 80)
		distancia = 80

	let dif = 3000 / (100 / distancia) - 200

	estaEscena.physics.moveToObject(pl,
		pu,
		-dif)

	//cambiar el turno
	equipoA = !equipoA;
}

function finPartido(a){
	fin = true;
	victoria.play();
	
	estaEscena.tweens.add({
		targets: cuadradoBlanco,
		duration: 700,
		alpha: 0.9,
		ease: 'Linear',
		onComplete: () => {
			estaEscena.tweens.add({
			targets: cartelFin,
			duration: 1000,
			scaleX: 2,
			scaleY: 1,
			alpha: 1,
			scaleY: 1,
			ease: 'Expo.easeOut',
			onComplete: () => {
				let partFin = estaEscena.add.particles(0,0,'estrella',{
					x: {random:[-100,cam.width]},
					lifespan: 3000,
					gravityY: 200,
					rotate: { start: 0, end: 360 },
					tint: {random: [0x52ff00,0xffffff]},
					frequency: 80,
					scale: {min: 0.1,max: 0.5},
					blendMode: 'ADD'
			})
			
			setTimeout(()=> {partFin.stop()}, 10000);
		
		partFin.setDepth(113);
			
				if(a === 'A')
				{
					textFin.setText('AZUL')
					textFin.setFill('#0000ff')
				}
				else
				{
					textFin.setText('ROJO')
					textFin.setFill('#ff0000')
				}
				
					
				estaEscena.tweens.add({
				targets: textFin,
				duration: 500,
				alpha: 1,
				scale: 1,
				ease: 'Expo.easeOut',
				onComplete: ()=>{
					
					mostrarJugFin(a === 'A' ? 'A' : 'B')
				}
				});
				}
			});
		}
	});
}

function crearLimitador(x, y, ox, oy, tx, ty, col = 0xff0000, al = 0, nombre = 'lim') {
	let limitador = estaEscena.physics.add.image(x, y, 'cuadro')
		.setImmovable(true)
		.setName(nombre)
		.setBounce(0.2)
		.setOrigin(ox, oy)
		.setAlpha(al)
		.setDisplaySize(tx, ty)
		.setTint(col)
	LIMITADORES.push(limitador);
}

function golaso(a) {
	audioGol.play();
	ruidoGol.play();
	
	for (let i = 0; i < 20; i++) {
		let r = random(100,1500);
		let r2 = random(1500,3000);
	

	let eao = estaEscena.time.addEvent({
		delay: i < 10 ? r : r2, // ms
		callback: explotaCuete,
		paused: false
	});
	
	}
	
	// animar foto del goleador
	let postemp = {x: fJUG.children.entries[jIndex].x,y:fJUG.children.entries[jIndex].y};
	let scaleTem = {x: fJUG.children.entries[jIndex].scaleX, y: fJUG.children.entries[jIndex].scaleY}

	fJUG.children.entries[jIndex].setOrigin(0.5)

	estaEscena.tweens.chain({
		targets: fJUG.children.entries[jIndex],
		tweens:[
			{
				scale: 1,
				x: cam.width/2,
				y:400,
				duration: 3000,
				ease: 'Back.easeOut'//'bounce.out'	
			},{
				scaleX: scaleTem.x,
				scaleY: scaleTem.y,
				x: postemp.x,
				y: postemp.y,
				duration: 2000,
				ease: 'Back.easeIn',
				onComplete: ()=>{
					fJUG.children.entries[jIndex].setOrigin(0)
					res.seguirGol = false;
					res.y = -500
					res.setScale(1)
					
					res2.seguirGol = false;
					res2.y = -500
					res2.setScale(1)
					
					// Finalizar partido...
					if(tempGol1 >= cantGol)
				{
					finPartido('A')
					return;
				}
					
				if(tempGol2 >= cantGol)
				{
					finPartido('B')
					return;
				}
					
					iniciarMedioCampo();
				}

			}]});
		
	//Resplandor gira y sigue al goleador
		res.seguirGol = true;
		res.setScale(2)
		res2.seguirGol = true;
		res2.setScale(2)
			
	estaEscena.tweens.add({
			targets: cartelGol,
			duration: 700,
			scaleY: 1,
			hold: 3000,
			ease: 'quart.out',
			yoyo: true,
			onComplete: () => {
				pelota.setPosition(-500, -500)
			}
		});
	
	colorGol = a.name;
		
	if (!gol && a.name === 'gol1') {
		tempGol2++;
		textGol2.setText(tempGol2);
		gol = true;
		equipoA = true;
		//alert('goooool de Equipo B'+ a.name + ' saca Equipo A')
	}

	if (!gol && a.name === 'gol2') {
		tempGol1++;
		textGol1.setText(tempGol1);
		equipoA = false
		gol = true;
		//	alert('goooool de Equipo A'+a.name + ' saca equipo B')
	}
	pelota.body.velocity.x = 0;
	pelota.body.enable = false;
	//pelota.setPosition(-500, -500)
	//iniciarMedioCampo();
}

function iniciarMedioCampo() {
	for (let i = 0; i < 8; i++) {
		let a = jugA.children.entries;
		let vel = random(10, 30) * 100;
		//	let d = {a[i].posIniX,a[i].posIniY};
		//estaEscena.physics.moveToObject(a[i],a.posInicial,vel)
		
		estaEscena.tweens.add({
			targets: a[i],
			duration: vel,
			x: a[i].posIniX,
			y: a[i].posIniY,
			onComplete: () => {
				contIniciar++;
			}
		});
	}
	despuesDelGol();
}

function explotaCuete() {
	cuetes3.play();
	exp = estaEscena.add.particles(200,400,'blanco',{
		x: random(100,cam.width-100),
		y: random(0,cam.height-200),
		speed: {
			random: [200, 800]}, //{start: 800,end: 0},
		scale: {
			start:1,end:0//random: [0.1, 0.3]
		},
		blendMode: 1,
		alpha: {
			start: 1, end: 0
		},
		tint: colorGol === 'gol1' ? 0xff0000 : 0x0000ff,//0xFD961F,//[0xef232e,0x005813,0xff0000,0x00ff00,0x0000ff,0x12fe89],
		quantity: 50,
		lifespan: {
			random: [300,1000]}
	});
	exp.explode();
}

function particulas() {
	partPelota = estaEscena.add.particles(0, 0, 'blanco', {
		x: pelota.x,
		y: pelota.y,
		//gravityY: 300,
		//	speedY: 200,
		lifespan: 1000, // {min:1000,max:2500},
		quantity: 1,
		frequency: 0,
		scale: {
			start: 0.3, end: 0
		},
		tint: 0xff0000,
		alpha: {
			start: 1, end: 0
		},
		follow: pelota,
		blendMode: 1// 'ADD',
		//emitZone: { type: 'edge', source: shape1, quantity: 400, yoyo: false }
	});
	partPelota.setDepth(1)
}

function despuesDelGol() {
	let t = 1000;
	//pelota.body.enable = false;
	pelota.setScale(5)
	pelota.setAlpha(0)
	pelota2.setAlpha(0)
	
	setTimeout(() => {
		if (contIniciar === 8) {
			pelota.setPosition(750, 370);
			pelota.setScale(5);
			pelota.setAlpha(0);

			estaEscena.tweens.add({
				targets: pelota,
				scale: 0.1,
				alpha: 1,
				duration: 1500,
				ease: 'Sine.easeInOut',
				onComplete: () => {

					pelota.body.enable = true;
					pelota.body.velocity.x = 0;
					pelota.body.velocity.y = 0;
					contIniciar = 0;
					audioInicio.play();
					audioInicio.on('complete', () => {
						gol = false
						pelota.setAlpha(0)
						pelota2.setAlpha(1)
					})
					//gol = false;
				}
			});
		} else {
			t = 100;
			despuesDelGol();
		}

	},
		t);
}

// Explotar jug con Roja...
function partJugRoja(jug) {
	var emitter1 = estaEscena.add.particles(0,0,'blanco',{
		x: 200,
		y: 200,
		speed: {
			random: [500, 2000]}, //{start: 800,end: 0},
		scale: {
			random: [0.2, 1]},
		blendMode: 4,
		alpha: {
			start: 1, end: 0
		},
		tint: jug.equipo === 'A'? 0x0000ff : 0xff0000,
		quantity: 50,
		bounce: 0.3,
		bounds: {
			x: 0, y: 0, width: cam.width, height: cam.height
		},
		//active: false,
		lifespan: {
			random: [1000, 2000]},
		follow: jug
	});
	emitter1.explode();
}