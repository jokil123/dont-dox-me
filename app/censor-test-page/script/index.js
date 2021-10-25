const changeText = () => {
  let susElement = document.createElement("div");
  let p = document.createElement("p");
  susElement.append(p);
  p.innerHTML = "sus";

  document.getElementById("mutationElement").append(susElement);
  // document.getElementById("mutationElement").innerText += "sus";
  // document.getElementById("mutationElement").textContent += "sus";
};
