function submitButtonStyle(id) {
  var buttonColour = document.getElementById(id).style.backgroundColor;
  if (buttonColour != "yellow") {
    buttonColour = "yellow";
  } else {
    buttonColour = "";
  }

  document.getElementById(id).style.backgroundColor = buttonColour;
}
function capture() {
  html2canvas(document.querySelector("#buttons-div")).then((canvas) => {
    // return Canvas2Image.saveAsPNG(canvas);
    return saveAs(canvas.toDataURL(), "canvas.png");
    document.body.appendChild(canvas);
  });
}

function saveAs(uri, filename) {
  var link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
