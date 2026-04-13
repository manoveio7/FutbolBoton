var SceneCarga = {
    key: 'SceneCarga',
    active: false,
    preload: C_carga,
    create: C_inicio,
	extends: Phaser.Scene
};

function C_carga()
{
	let camera = this.cameras.main;
	
	let cajaCarga = this.add.image(camera.width/2,camera.height/2,'cajaCarga').setScale(2,1.4);
	let barraCarga = this.add.image(camera.width/2,camera.height/2,'barraCarga').setScale(2,1.4);
	let txt = this.add.text(cajaCarga.x,cajaCarga.y).setFontFamily('Arial').setFontSize(40).setColor('#000000').setOrigin(0.5,0);
	
	this.load.on('progress',(valor) => {
		let ancho = Math.round(barraCarga.width * valor);
		barraCarga.setCrop(0,0,ancho,cajaCarga.height);
		txt.setText(Math.round(valor * 100)+'%');
		
		if(valor === 1)
			txt.setText('Listo!');
	});
	
		// Cargar fotos de los jugadores...
	for (let i = 0; i < 8; i++) {

		this.load.image('j' + i, './img/jug/j' + i + '.png');
		this.load.image('f' + i, './img/jug/f' + i + '.png');
		this.load.audio('d' + i, './audios/dichos/D/d'+i+'.mp3');

	}

	this.load.image('cuadro', './img/cuadro.png');
	this.load.image('player', './img/play.png');
	this.load.image('resplandor', './img/resplandor.png');
	this.load.image('flecha', './img/flecha.png');
	this.load.image('fondo', './img/fondoBF2.png')
	this.load.image('arcos', './img/arcos.png')
	this.load.image('pelota', './img/pelota3.png')
	this.load.image('blanco', './img/blanco.png');
	this.load.image('cartelGol', './img/cartelGol.png');
	this.load.image('jues2','./img/jug/jues.png')
	this.load.image('jues','./img/jug/jues2.png')
	this.load.image('res','./img/res.png')
	this.load.image('amarilla','./img/amarilla.png')
	this.load.image('fabian', './img/jug/fabian.png');
	this.load.image('tilePelota', './img/tilePelota.png');
	this.load.image('cuadradoBlanco', './img/cuadradoBlanco.png');
	this.load.image('cartelFin', './img/cartelFin.png');
	this.load.image('estrella', './img/estrella.png');
	this.load.image('pantRota', './img/pantRota.png');
	this.load.image('fondoEstadio','./img/pantUno/prima.png');
	this.load.image('btnPlay','./img/btnPlay.png');
	this.load.image('fondoMoneda','./img/pantUno/fondoMoneda.png');
	this.load.image('arbitro','./img/pantUno/arbitro.png');
	this.load.image('habla','./img/pantUno/habla.png');
	this.load.image('btnFlecha','./img/btnFlecha.png');
	this.load.image('btnReiniciar','./img/btnReiniciar.png');

	// spritesheet animaciones
	this.load.spritesheet('moneda','./img/moneda.png',{ frameWidth: 32, frameHeight: 32 });
	
	
	// Cargar los audios
	this.load.audio('jugPelota', './audios/jugPelota.mp3');
	this.load.audio('palo', './audios/palo.mp3');
	this.load.audio('turno', './audios/turno.mp3');
	this.load.audio('inicioJuego', './audios/startGame.mp3');
	this.load.audio('audioGol', './audios/audioGol.mp3');
	this.load.audio('ruidoGol', './audios/ruidoGol.mp3');
	this.load.audio('chocaLateral', './audios/chocaLateral.mp3');
	this.load.audio('cuetes3', './audios/cuetes3.mp3');
	this.load.audio('audioLoop', './audios/loop.mp3');
	this.load.audio('casiGol', './audios/casiGol.mp3');
	this.load.audio('moverJues', './audios/mover.ogg');
	this.load.audio('fau', './audios/fau.mp3');
	this.load.audio('explota', './audios/explota.mp3');
	this.load.audio('victoria', './audios/victoria.mp3');
	this.load.audio('noJueguenAsi', './audios/dichos/noJueguenAsi.wav');
	this.load.audio('ahoraVasVer', './audios/dichos/ahoraVasVer.wav');
	this.load.audio('toma', './audios/dichos/toma.wav');
	this.load.audio('play', './audios/play.wav');
	this.load.audio('subeMoneda', './audios/subeMoneda.wav');
	this.load.audio('bajaMoneda', './audios/bajaMoneda.wav');
	this.load.audio('desaparece', './audios/desaparece.mp3');
	this.load.audio('amarillaJues', './audios/amarillaJues.wav');
	this.load.audio('toca', './audios/jump.ogg');
	this.load.audio('tomaAmarilla', './audios/tomaAmarilla.wav');
	this.load.audio('atencion', './audios/atencion.mp3');
	this.load.audio('musica', './audios/musica.ogg');
	
	
	for(let i = 0; i < 3; i++)
	{
		this.load.audio('gente'+i, './audios/gente'+i+'.mp3');
	}

	
}

function C_inicio()
{
	this.cameras.main.fadeOut(1000,0,0,0);
	
	this.cameras.main.once('camerafadeoutcomplete',() => {
		this.scene.start('Intro');
	});
}