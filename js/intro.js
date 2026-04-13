var Intro = {
	key: 'Intro',
	active: false,
	create: Iinicio,
	extends: Phaser.Scene
};

var Icam;
var IbtnPlay;
var IestaEscena;
var Ifondo;
var Imoneda;
var Ihabla;
var textHabla;
var random;
var jugPelota;
var btnFlechaIzq;
var btnFlechaDer;
var cantGol;

var playAudio;
var subeMoneda;
var bajaMoneda;
var toca;
var musica;

function Iinicio(){
	random = Phaser.Math.Between;
	this.cameras.main.setZoom(1)
	this.cameras.main.fadeIn(1000,0,0,0);
	
	IestaEscena = this;
	Icam = this.cameras.main;
	cantGol = 2;
	
	playAudio = this.sound.add('play');
	subeMoneda = this.sound.add('subeMoneda');
	bajaMoneda = this.sound.add('bajaMoneda');
	jugPelota = this.sound.add('jugPelota');
	toca = this.sound.add('toca');
	musica = this.sound.add('musica');

	Ifondo = this.add.image(0,0,'fondoEstadio')
	.setDisplaySize(Icam.width,Icam.height)
	.setOrigin(0)
	

	
	IbtnPlay = this.add.image(Icam.width/2, Icam.height/2+200,'btnPlay')
	.setScale(0.3)
	.setInteractive()
	.on('pointerup',tirarMoneda)

	btnFlechaIzq = this.add.image(100,550,'btnFlecha')
	.setScale(0.15)
	.setAngle(90)
	.setInteractive()
	.on('pointerup',()=>{
		toca.play();

		if(cantGol  >= 2)
			cantGol--;
		textGoles.text = cantGol;
	})

	btnFlechaDer = this.add.image(350,550,'btnFlecha')
	.setScale(0.15)
	.setAngle(-90)
	.setInteractive()
	.on('pointerup',()=>{
		toca.play();

			cantGol++;
		textGoles.text = cantGol;
	})
	

	textGoles = this.add.text(220, 550, cantGol, {
		font: '100px Arial', fill: '#ffffff', align: 'center'
	}).setOrigin(0.5).setDepth(11).setAlpha(1)

	textCantGolesTitilo = this.add.text(220, 630, 'Cantidad de Goles', {
		font: '40px Arial', fill: '#ffffff', align: 'center'
	}).setOrigin(0.5).setDepth(11).setAlpha(1)
	
	musica.play()	
	
	IanimBtnplay = this.tweens.add({
		targets: IbtnPlay,
		delay: 1000,
		scaleX: 0.4,
		scaleY: 0.4,
		alpha: 1,
		duration: 1000,
		ease: 'Bounce.easeOut',
		yoyo: true,
		repeat: -1
		});
		
		
	Imoneda = this.add.sprite(Icam.width/2,550,'moneda')
	.setScale(0.7)
	.setAngle(90)
	.setAlpha(0)


	this.anims.create({
		key: 'girarMoneda',
		frames: this.anims.generateFrameNumbers('moneda', {
			start: 0, end: 5
		}),
		frameRate: 30,
		repeat: -1
	});
	
	Imoneda.anims.play('girarMoneda', true);
	
	
	
	Ihabla = this.add.image(900,250,'habla')
	.setScale(0.7)
	.setDepth(10)
	.setScale(0)
	
	textHabla = this.add.text(900, 260, 'ROJO', {
		font: '100px Courier', fill: '#ff0000', stroke: '#000000', strokeThickness: 5, align: 'center'
	}).setOrigin(0.5).setDepth(11).setAlpha(0)
}

function tirarMoneda(){
	playAudio.play();
	
	IbtnPlay.removeInteractive();
	
	IanimBtnplay.pause();
	
	IestaEscena.cameras.main.fadeOut(1000,0,0,0);
	
	IestaEscena.cameras.main.once('camerafadeoutcomplete',() => {
	
		Icam.pan(Icam.width/2, 100, 2000, 'Power2');
        Icam.zoomTo(3, 2000);
        
		btnFlechaIzq.destroy();
		btnFlechaDer.destroy();
		textCantGolesTitilo.destroy();
		textGoles.destroy();

        Imoneda.setAlpha(1);
        
        IestaEscena.time.addEvent({
		delay: 3400, // ms
		callback: ()=> {
			Icam.pan(Icam.width/2, Icam.height/2, 2000, 'Power2');
    		Icam.zoomTo(1, 2000);
        
		},
		paused: false
	});
        
        IestaEscena.tweens.add({
		targets: Imoneda, 
		onStart: ()=>{
			subeMoneda.play()
			IestaEscena.time.addEvent({
				delay: 3500, // ms
				callback: ()=> {
					bajaMoneda.play();
				}
			})
		},
		y: 100,
		scale: 2,
		ease: 'Power2',
		duration: 2000,
		hold: 1000,
		yoyo: true,
		onComplete: ()=>{
			jugPelota.play();
			Imoneda.destroy();
			IestaEscena.time.addEvent({
			delay: 1000, // ms
			callback: ()=> {
				IestaEscena.tweens.add({
							targets: Ihabla, 
							scale: 0.7,
							ease: 'Bounce.easeOut',
							duration: 1000,
							onComplete:()=>{
								let a = random(0,1);
								
								if(a === 0)
								{
									textHabla.setFill('#ff0000')
									textHabla.text = 'ROJO'
								}
								else
								{
									textHabla.setFill('#0000ff')
									textHabla.text = 'AZUL'
								}
								
								
								let ja = IestaEscena.time.addEvent({
									delay: 200, // ms
									callback: ()=> {
										if(textHabla.alpha === 0)
											textHabla.setAlpha(1)
										else
											textHabla.setAlpha(0)
											if(ja.repeatCount === 0)
											{
												IestaEscena.cameras.main.fadeOut(1000,0,0,0);
												
												IestaEscena.tweens.add({
													targets: musica, 
													volume: 0,
													duration: 1000,
													onComplete: ()=>{musica.stop();}
												});
												
												IestaEscena.cameras.main.once('camerafadeoutcomplete',() => {
												IestaEscena.scene.start('main');
									});
											}
									},
									paused: false,
									repeat: 10
								});
							}
				});
		},
		paused: false
	});
			
		}
        });
        
		IbtnPlay.removeInteractive();
		IanimBtnplay.stop();
		IbtnPlay.setTexture('arbitro')
		.setScale(0.7)
		Ifondo.setTexture('fondoMoneda')	
		IestaEscena.cameras.main.fadeIn(1000,0,0,0);
		
	});
}