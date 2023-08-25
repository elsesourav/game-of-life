class Cells {
   constructor(ctx, rows, cols, size, scale, showBox = false) {
      this.ctx = ctx;
      this.rows = rows;
      this.cols = cols;
      this.size = size;
      this.scale = scale;
      this.showBox = showBox;
      this.cells = [];
      this.updatedCells = [];

      this.#setup();
   }

   #setup() {
      for (let i = 0; i < this.rows; i++) {
         this.cells[i] = [];
         this.updatedCells[i] = [];

         for (let j = 0; j < this.cols; j++) {
            const val = Math.round(Math.random());

            this.cells[i][j] = val;
            this.updatedCells[i][j] = val;
         }
      }
   }

   #getCellByIndex(i, max) {
      return (i < 0 ? max + i : i) % max;
   }

   #getNeighborCount(cells, i, j) {
      let count = 0;

      for (let I = -1; I < 2; I++) {
         for (let J = -1; J < 2; J++) {
            const x = this.#getCellByIndex(i + I, this.rows);
            const y = this.#getCellByIndex(j + J, this.cols);
            if (cells[x][y]) {
               count++;
            }
         }
      }
      count -= cells[i][j];
      return count;
   }

   add(x, y) {
      const dx = x * this.scale;
      const dy = y * this.scale;
      const i = (dx - (dx % this.size)) / this.size;
      const j = (dy - (dy % this.size)) / this.size;

      if (i < 0 || i > this.rows - 1 || j < 0 || j > this.cols - 1) return;

      for (let I = -1; I < 2; I++) {
         for (let J = -1; J < 2; J++) {
            const x = this.#getCellByIndex(i + I, this.rows);
            const y = this.#getCellByIndex(j + J, this.cols);
            this.cells[x][y] = Math.round(Math.random());
         }
      }
      this.cells[i][j] = 1;
   }

   update() {
      for (let i = 0; i < this.cells.length; i++) {
         for (let j = 0; j < this.cells[i].length; j++) {
            const neighbors = this.#getNeighborCount(this.cells, i, j);
            const cell = this.cells[i][j];

            // update cell
            if ((neighbors == 3 || navigator == 2) && !cell) {
               this.updatedCells[i][j] = 1;
            } else if (cell && (neighbors < 2 || neighbors > 3)) {
               this.updatedCells[i][j] = 0;
            } else {
               this.updatedCells[i][j] = this.cells[i][j];
            }
         }
      }

      // update cells from updated cells
      for (let i = 0; i < this.cells.length; i++) {
         for (let j = 0; j < this.cells[i].length; j++) {
            this.cells[i][j] = this.updatedCells[i][j];
         }
      }
   }

   draw() {
      const { c: ctx, rows, cols, size } = this;

      c.lineWidth = 3;
      c.strokeStyle = "white";

      for (let i = 0; i < this.cells.length; i++) {
         for (let j = 0; j < this.cells[i].length; j++) {
            if (this.showBox) {
               c.beginPath();
               c.rect(j * size, i * size, size, size);
               c.stroke();
               c.closePath();
            }

            if (this.cells[i][j]) {
               c.fillStyle = `rgba(${colors.cell} 1)`;
               c.fillRect(i * size + 2, j * size + 2, size - 4, size - 4);
            }
         }
      }
   }
}
