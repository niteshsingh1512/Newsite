const Apikey = "cd610ebb555345458840210ca9e3765a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apikey=${Apikey}`);
  const data = await res.json();
  // console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("micard");
  const newsTemplate = document.getElementById("temp-newscard");

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsTemplate.content.cloneNode(true);
    fillDataCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#imgofnews");
  const newsTitle = cardClone.querySelector("#newstitle");
  const newsSource = cardClone.querySelector("#newssource");
  const newsCont = cardClone.querySelector("#newsdata");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsCont.innerHTML = article.description;
  // console.log("Image URL:", article.urlToImage);
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source.name}:- ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchnews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav=navItem;
  curSelectedNav.classList.add("active");
}

const searchbtn=document.getElementById('srcbtn');
const searchtext=document.getElementById('searchtext');

searchbtn.addEventListener('click',()=>{
    const query =searchtext.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})