const changeText = () => {
  let susElement = (document.createElement("p").innerText = "sus");

  document.getElementById("mutationElement").append(susElement);
  // document.getElementById("mutationElement").innerText += "sus";
  // document.getElementById("mutationElement").textContent += "sus";
};
