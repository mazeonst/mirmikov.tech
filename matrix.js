let C = document.querySelector("canvas"),
    $ = C.getContext("2d"),
    W = (C.width = window.innerWidth),
    H = (C.height = window.innerHeight);

const str = "А+阿0В-Г1Д=Е2F Ж3З 用4Й К5Л 哟6Н О7H Р8С Т9У Y!W Ц?Ч 夏.ЩЪ,恩 Ь:哈Ю;Я";
const matrix = str.split("");

let font = 11,
    col = W / font,
    arr = [];

for (let i = 0; i < col; i++) arr[i] = 1;

function draw() {
  $.fillStyle = "rgba(0,0,0,0.05)";
  $.fillRect(0, 0, W, H);
  $.fillStyle = "#0f0";
  $.font = font + "px system-ui";
  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)];
    $.fillText(txt, i * font, arr[i] * font);
    if (arr[i] * font > H && Math.random() > 0.975) arr[i] = 0;
    arr[i]++;
  }
}
setInterval(draw, 123);

window.addEventListener("resize", () => {
  C.width = window.innerWidth;
  C.height = window.innerHeight;
  W = C.width;
  H = C.height;
  col = W / font;
  arr = [];
  for (let i = 0; i < col; i++) arr[i] = 1;
});
