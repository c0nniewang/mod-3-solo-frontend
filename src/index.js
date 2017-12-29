document.addEventListener('DOMContentLoaded', () => {
  console.log('content loaded')

  Adapter.loadBusinessArticles().then(function(json) {
    let articles = json["articles"].slice(0, 3)
    articles.forEach(function(article) {
      let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
      let div = newArticle.renderPreview();

     document.getElementById("business-col").appendChild(div)
    })
  })

  Adapter.loadPolitics().then(function(json) {
    let articles = json["articles"].slice(0, 3)
    articles.forEach(function(article) {
      let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
      let div = newArticle.renderPreview();
      document.getElementById("politics-row").appendChild(div)
    })
  })

  Adapter.loadTech().then(function(json) {
    let articles = json["articles"].slice(0, 3)
    articles.forEach(function(article) {
      let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
      let div = newArticle.renderPreview();
      document.getElementById("tech-row").appendChild(div)
    })
  })


  document.getElementById('content').addEventListener("click", articleFunctions)

  function articleFunctions() {
    if (event.target.id === "addArticle") {
      console.log(event.target.dataset.id)
      return addArticle();
    }
  }






})