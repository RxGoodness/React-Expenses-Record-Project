function main() {
  let imagesArray = [
    "myimages/Luke-Skywalker.jpeg",
    "myimages/C-3PO.jpeg",
    "myimages/R2-D2.jpeg",
    "myimages/Darth-Vader.png",
    "myimages/Leia-Organa.jpeg",
    "myimages/Owen-Lars.jpeg",
    "myimages/Beru-Whitesun-lars.png",
    "myimages/R5-D4.jpeg",
    "myimages/Biggs-Darklighter.jpeg",
    "myimages/Obi-Wan-Kenobi.jpeg",
  ];

  const Container = document.querySelector(".container");
  let output = "";
  let url = `https://swapi.dev/api/people/`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // let rep = data.results;
      console.log(data);
      data.results.map((individual, index) => {
        output += `
            <div class = "character-data">
                <img class = "star-char img" src = ${imagesArray[index]}>
                <p>Name: ${individual.name}</p>
            <div class = "info">
                <p>Gender: ${individual.gender}</p>
                <p>Height: ${individual.height}</p>
                </div>
            </div>
            `;
      });
      Container.innerHTML = output;
      const characterData = document.querySelectorAll(".character-data");
      const characterInfo = document.querySelectorAll(".info");

      characterData.forEach((individual, index) => {
        individual.addEventListener("click", () => {
          characterInfo[index].classList.toggle("open");
        });
      });
    });
}

main();
