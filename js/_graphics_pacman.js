class Example extends Phaser.Scene
{
    create ()
    {
        const graphics = this.add.graphics();

        this.tweens.addCounter({
            from: 0,
            to: 360,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            onUpdate: function (tween)
            {
                const t = tween.getValue();

                graphics.clear();
                graphics.fillStyle(0xffff00, 1);
                graphics.slice(260, 300, 200, Phaser.Math.DegToRad(360), Phaser.Math.DegToRad(t), true);
                graphics.fillPath();
            }
        });

    }
}

const config = {
    width: 800,
    height: 600,
    backgroundColor: '#010166',
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
