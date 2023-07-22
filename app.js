const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  
  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1
    };
    this.height = 100;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if(this.position.y + this.height + this.velocity.y < canvas.height)
    this.velocity.y += gravity;

    else this.velocity.y = 0;
  }
}

const player = new Player({
  x: 0,
  y: 0
});

// const player2 = new Player({
//   x: 300,
//   y: 100
// });

const keys = {
  a: {
    pressed: false
  },
  // arrowleft: {
  //   pressed: false
  // },
  // arrowright: {
  //   pressed: false
  // },
  d: {
    pressed: false
  }
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/kirbylands.png'
})

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  // player2.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
    else if (keys.a.pressed) player.velocity.x = -5;

  // player2.velocity.x = 0;
  // if (keys.arrowright.pressed) player2.velocity.x = 5;
  //   else if (keys.arrowleft.pressed) player2.velocity.x = -5;
}

animate();

window.addEventListener('keydown', (e) => {
  console.log(e)
  switch (e.key) {
    case 'w':
      player.velocity.y = -20;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    // case 'ArrowLeft':
    //   keys.arrowleft.pressed = true;
    //   break;
    // case 'ArrowRight':
    //   keys.arrowright.pressed = true;
    //   break;
    // case 'ArrowUp':
    //   player2.velocity.y = -20;
    //   break;
  }
});


window.addEventListener('keyup', (e) => {
  console.log(e)
  switch (e.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    // case 'ArrowLeft':
    //   keys.arrowleft.pressed = false;
    //   break;
    // case 'ArrowRight':
    //   keys.arrowright.pressed = false;
    //   break;
  }
});