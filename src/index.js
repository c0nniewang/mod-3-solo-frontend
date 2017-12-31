document.addEventListener('DOMContentLoaded', () => {
  console.log('content loaded')

  Adapter.loadSavedArticles().then(function(json) {
    json.articles.forEach(function(article) {
      let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source, article.description, article.urlToImage);
    })

    let recentSaved = json.articles.slice(-5).reverse()
    recentSaved.forEach(function(el) {
      document.getElementById('savedContent').innerHTML += `
      <a href=${el.url} target="_blank">${el.title}</a><br>`
    })
  })

  Adapter.loadBusinessArticles().then(function(json) {
    let articles = json["articles"].slice(0, 6)
    articles.forEach(function(article) {
      let existing = Article.all().find(function(el) {
        return el.url === article.url
      })

      if (existing === undefined) {
        let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
        let div = newArticle.renderPreview();

        document.getElementById("business-col").appendChild(div)

        newArticle.renderButtonAdd();

      } else {
        div = existing.renderPreview();
        document.getElementById("business-col").appendChild(div)
        existing.renderButtonFaved();
      }
    })
  })

  Adapter.loadPolitics().then(function(json) {
    let articles = json["articles"].slice(0, 6)
    articles.forEach(function(article) {
      let existing = Article.all().find(function(el) {
        return el.url === article.url
      })

      if (existing === undefined) {
        let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
        let div = newArticle.renderPreview();
        document.getElementById("politics-row").appendChild(div)

        newArticle.renderButtonAdd();

      } else {
        div = existing.renderPreview();
        document.getElementById("politics-row").appendChild(div)
        existing.renderButtonFaved();
      }
    })
  })

  Adapter.loadTech().then(function(json) {
    let articles = json["articles"].slice(0, 6)
    articles.forEach(function(article) {
      let existing = Article.all().find(function(el) {
        return el.url === article.url
      })

      if (existing === undefined) {
        let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
        let div = newArticle.renderPreview();

        document.getElementById("tech-row").appendChild(div)

        newArticle.renderButtonAdd();

      } else {
        div = existing.renderPreview();
        document.getElementById("tech-row").appendChild(div);
        existing.renderButtonFaved();
      }
    })
  })

  document.getElementById('content').addEventListener("click", articleFunctions);

  document.getElementById('navbar').addEventListener("click", navFunctions);

  function articleFunctions() {
    if (event.target.id.slice(0, 10) === "addArticle") {
      return addArticle();
    } else if (event.target.id.slice(0, 13) === "deleteArticle") {
      return deleteArticle();
    }
  }

  function navFunctions() {
    if (event.target.id === "savedArticles") {
      return renderSavedArticles();
    } else if (event.target.id === "home") {
      location.reload()
    }
  }

})