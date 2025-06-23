const C = document.querySelector("canvas"),
      ctx = C.getContext("2d"),
      fontSize = 11,
      chars = "車+Б0雨-Г1水=Е2馬Ж3眉N4並К5掠М6Н醒7ПР8WF9УФ!Х靜?ЧG.ЩЪ,ЫЬ:Э水;Я".split("");

let W = C.width = innerWidth,
    H = C.height = innerHeight,
    columns = Math.floor(W / fontSize),
    drops = Array.from({length: columns}, () => Math.floor(Math.random() * H / fontSize));

function step() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
  ctx.font = fontSize + "px monospace";

  for(let i = 0; i < columns; i++) {
    const ch = chars[Math.random() * chars.length | 0];
    ctx.fillText(ch, i * fontSize, drops[i] * fontSize);

    if(drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(step, 120);

addEventListener('resize', () => {
  const oldW = W, oldH = H;

  W = innerWidth;
  H = innerHeight;

  if (W !== oldW) {
    C.width = W;
    C.height = H;
  }

  const k = H / oldH;
  for(let i = 0; i < drops.length; i++) {
    drops[i] = Math.floor(drops[i] * k);
  }

  const newCols = Math.floor(W / fontSize);
  if (newCols > columns) {
    for(let i = columns; i < newCols; i++) {
      drops[i] = Math.floor(Math.random() * H / fontSize);
    }
  } else if (newCols < columns) {
    drops.length = newCols;
  }
  columns = newCols;
});
