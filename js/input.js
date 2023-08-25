let down = false;


/*  ---------- event listener for pc  -----------*/
function pushCell({ x, y }) {
   if (addCellByClick) {
      const e = cvs.getBoundingClientRect();
      cells.add(x - e.left, y - e.top);
   }
}

document.body.addEventListener("mouseup", () => {
   down = false;
});

cvs.addEventListener("mousedown", (e) => {
   down = true;
   pushCell({ x: e.clientX, y: e.clientY });
});

cvs.addEventListener("mousemove", (e) => {
   if (down) {
      pushCell({ x: e.clientX, y: e.clientY });
   }
})

/*  ---------- event listener for mobile -----------*/
cvs.addEventListener("touchend", () => {
   down = false;
});
cvs.addEventListener("touchstart", (e) => {
   down = true;
   pushCell({ x: e.touches[0].clientX, y: e.touches[0].clientY });
});

cvs.addEventListener("touchmove", (e) => {
   if (down) {
      pushCell({ x: e.touches[0].clientX, y: e.touches[0].clientY });
   }
})

/* ------------------ settings -------------- */
buttonReset.addEventListener("click", () => {
   cells = new Cells(c, W / size, H / size, size, SCALE);
})

buttonToggleColor.addEventListener("click", () => {
   buttonToggleColor.classList.toggle("active");
   const temp = colors.bg;
   colors.bg = colors.cell;
   colors.cell = temp;
});

buttonAddCell.addEventListener("click", () => {
   addCellByClick = !addCellByClick;
   buttonAddCell.classList.toggle("active", addCellByClick);
   cvs.classList.toggle("add-cell-by-click", addCellByClick);
});

inputSize.addEventListener("change", (e) => {
   const value = Number(e.target.value);
   valueSize.innerText = size = value;
   updateSize(size, SCALE);
   cells = new Cells(c, W / size, H / size, size, SCALE);
});

inputSpeed.addEventListener("change", (e) => {
   const value = Number(e.target.value);
   valueSpeed.innerText = FPS = value;
   ani.updateFPS(FPS);
});

openSettings.addEventListener("click", () => {
   settings.classList.toggle("active");
});


