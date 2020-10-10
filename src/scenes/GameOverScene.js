import {Scene} from 'phaser';

class GameOverScene extends Scene {
  constructor() {
    super('scene-gameover');
  }

  create() {
    this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'SPLAT!', {
      fill: '#000',
      fontSize: 42
    }).setOrigin(0.5);

    this.add.text(window.innerWidth / 2, (window.innerHeight / 2) + 100, 'Press space to play again!', {
      fill: '#000',
      fontSize: 20
    }).setOrigin(0.5);

    this.sound.play('splat');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('scene-game');
    }
  }
}

export default GameOverScene;