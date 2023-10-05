function generateMeme() {
  const imageInput = document.getElementById("imageInput");
  const topTextInput = document.getElementById("topTextInput");
  const bottomTextInput = document.getElementById("bottomTextInput");
  const memeImage = document.getElementById("memeImage");
  const downloadLink = document.getElementById("downloadLink");
  const downloadButton = document.getElementById("downloadButton");

  if (!imageInput.files[0]) {
    alert("Please select an image");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const originalImage = new Image();
    originalImage.src = e.target.result;

    originalImage.onload = function () {
      const scaledCanvas = document.createElement("canvas");
      const scaledCtx = scaledCanvas.getContext("2d");
      const originalCanvas = document.createElement("canvas");
      const originalCtx = originalCanvas.getContext("2d");

      const containerWidth = 600;
      const scale = Math.min(containerWidth / originalImage.width, 1);

      scaledCanvas.width = originalImage.width * scale;
      scaledCanvas.height = originalImage.height * scale;

      originalCanvas.width = originalImage.width;
      originalCanvas.height = originalImage.height;

      scaledCtx.drawImage(
        originalImage,
        0,
        0,
        scaledCanvas.width,
        scaledCanvas.height
      );

      const topText = topTextInput.value;
      scaledCtx.font = "40px Impact";
      scaledCtx.textAlign = "center";

      const topTextY = 50;

      scaledCtx.strokeStyle = "black";
      scaledCtx.lineWidth = 5;
      scaledCtx.strokeText(topText, scaledCanvas.width / 2, topTextY);

      scaledCtx.fillStyle = "white";
      scaledCtx.fillText(topText, scaledCanvas.width / 2, topTextY);

      const bottomText = bottomTextInput.value;
      const bottomTextY = scaledCanvas.height - 20;

      scaledCtx.strokeStyle = "black";
      scaledCtx.lineWidth = 5;
      scaledCtx.strokeText(bottomText, scaledCanvas.width / 2, bottomTextY);

      scaledCtx.fillStyle = "white";
      scaledCtx.fillText(bottomText, scaledCanvas.width / 2, bottomTextY);

      originalCtx.drawImage(
        scaledCanvas,
        0,
        0,
        originalCanvas.width,
        originalCanvas.height
      );

      const memeDataURL = originalCanvas.toDataURL("image/jpeg");
      memeImage.src = scaledCanvas.toDataURL("image/jpeg");
      memeImage.style.display = "block";
      downloadLink.href = memeDataURL;
      downloadButton.style.display = "block";
    };
  };

  reader.readAsDataURL(imageInput.files[0]);
}

document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    var downloadLink = document.getElementById("downloadLink");
    downloadLink.click();
  });
