class Wmonster {
    constructor(x, y, width, height, WmonsterPos, WmonsterAnimation) {
     
      this.animation = WmonsterAnimation;
      this.speed = 0.05;
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.WmonsterPosition = WmonsterPos;
  
      World.add(world, this.body);
    }
    animate() {
      this.speed += 0.05;
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.animation.length);
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.WmonsterPosition, this.width, this.height);
      noTint();
      pop();
    }
  }
  