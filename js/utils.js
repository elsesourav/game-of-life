// global variables
let colors = {
   bg: `0, 0, 0,`,
   cell: `255, 255, 255,`
}
let addCellByClick = true;


class Animation {
   constructor(fps) {
      this.fps = fps;
      this.run = false;
      this.fun = () => {};
   }

   #animate() {
      setTimeout(() => {
         if (this.run) {
            this.fun();
            this.#animate(this.fun);
         }
      }, 1000 / this.fps);
   }

   updateFPS(fps) {
      this.fps = fps;
   }

   updateFunction(fun) {
      this.fun = fun;
   }

   start(fun) {
      this.run = true;
      this.fun = fun;
      this.#animate();
   }

   stop() {
      this.run = false;
   }
}