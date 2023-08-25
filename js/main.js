const c = cvs.getContext("2d");

const SCALE = 4;
let FPS = 30;
let size = 20, W, H;

function updateSize(size, scale) {
   W = (window.innerWidth - (window.innerWidth % size)) * scale;
   H = (window.innerHeight - (window.innerHeight % size)) * scale;
   cvs.width = W;
   cvs.height = H;
   cvs.style.width = `${W / scale}px`;
   cvs.style.height = `${H / scale}px`;
}
updateSize(size, SCALE);

let cells = new Cells(c, W / size, H / size, size, SCALE);



const ani = new Animation(FPS);

ani.start(() => {
   c.fillStyle = `rgba(${colors.bg} 0.9)`;
   c.fillRect(0, 0, W, H);
   cells.update();
   cells.draw();
})
