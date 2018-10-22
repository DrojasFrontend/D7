var portfolio = document.querySelector("#work__grid");

(function() {
  fetch('data/portfolio.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    datos(data)
  })

  function datos(data) {
    //console.log(data);
    portfolio.innerHTML = ''
    for (let item of data) {
      portfolio.innerHTML += `
        <figure class="work__item">
          <a href="${item.url}" target="_blank">
            <div class="work__item__img">
              <img src="${item.img}" alt="${item.alt}">
              <figcaption>
                <h2>${item.title}</h2>
              </figcaption>
            </div>
            <div class="work__item__title">
              <h3> ${item.type} </h3>
              <p> ${item.developer} </p>
            </div>
          </a>
        </figure>
      `
    }
  }
}());