
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

document.getElementById("drawButton").addEventListener("click", drawArt);
document.getElementById("exportButton").addEventListener("click", exportImage);

function drawArt() {
  const sequenceText = document.getElementById("sequence").value.trim();
  const numNails = parseInt(document.getElementById("nails").value);
  const zeroBased = document.getElementById("zeroIndex").checked;

  if (!sequenceText) {
    alert("Please paste a valid pin sequence!");
    return;
  }

  const sequence = sequenceText.split(",").map(n => parseInt(n.trim()));
  if (!zeroBased) sequence.forEach((n, i) => sequence[i] = n - 1);

  const radius = canvas.width / 2 - 20;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const nails = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate nail positions
  for (let i = 0; i < numNails; i++) {
    const angle = (2 * Math.PI * i) / numNails - Math.PI / 2;
    nails.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  // Draw threads
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 0.4;
  ctx.beginPath();

  for (let i = 0; i < sequence.length - 1; i++) {
    const a = nails[sequence[i]];
    const b = nails[sequence[i + 1]];
    if (a && b) {
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
  }
  ctx.stroke();

  // Draw nails
  ctx.fillStyle = "#000";
  nails.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function exportImage() {
  const link = document.createElement("a");
  link.download = "halalclub-string-art.png";
  link.href = canvas.toDataURL();
  link.click();
}
