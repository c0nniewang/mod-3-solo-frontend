all = []
let id = 0
class Article {
  constructor(url, title, author, publishedAt, source, description, urlImage) {
    this.url = url;
    this.title = title;
    this.author = author;
    this.publishedAt = publishedAt;
    this.source = source
    this.description = description
    this.urlToImage = urlImage
    this.id = id++
    all.push(this);
  }

  static all() {
    return all;
  }

  renderPreview() {
    let article = document.createElement('div')
    article.className = "col col-sm-4 col-md-4 col-lg-4"
    // article.className = "thumbnail"
    article.innerHTML = `
      <a href=${this.url} target="_blank">
        <img src=${this.urlToImage} style="width: 100%">
      </a>
      <div class="caption">
        <p id="caption ${this.id}">
        ${this.title}<br>
        ${this.source}<br>
        ${this.publishedAt}
        </p>
      </div>`
      return article;
  }

  renderButtonFaved() {
    document.getElementById(`caption ${this.id}`).innerHTML += `<button type="button" class="btn btn-outline-info" style="float: right" data-id=${this.id} id="deleteArticle ${this.id}"> o </button>`
  }

  renderButtonAdd() {
    document.getElementById(`caption ${this.id}`).innerHTML += `<button type="button" class="btn btn-outline-info" style="float: right" data-id=${this.id} id="addArticle ${this.id}"> + </button>`
  }
}



function addArticle() {
  let target = event.target.dataset.id
  let article = Article.all().find(function(el) {
    return el.id === parseInt(target)
  })

  Adapter.getArticles().then(function(json){
    let found = json.find(function(el) {
      return el.url === article.url
    })
    if (found === undefined) {
      Adapter.createArticle(article).then(function(json) {
        let article_id = parseInt(json.id);
        let user_id = 1
        Adapter.createUserArticle(article_id, user_id)
        document.getElementById(`addArticle ${target}`).innerText = " o "
        document.getElementById('newSaves').innerHTML += `
        <a href=${json.url} target="_blank">${json.title}</a><br>`
      })
    } else {
      let article_id = parseInt(found.id)
      let user_id = 1
      Adapter.createUserArticle(article_id, user_id)
      document.getElementById(`addArticle ${target}`).innerText = " o "
      document.getElementById('newSaves').innerHTML += `
        <a href=${json.url} target="_blank">${json.title}</a><br>`
    }
  })
}

function deleteArticle() {
  let id = event.target.id.slice(14)
  let target = Article.all().find(function(el) {
    return el.id === parseInt(id)
  })

  let buttonTarget = event.target.id
  document.getElementById(`${buttonTarget}`).innerText = " + "
  document.getElementById(`${buttonTarget}`).id = `addArticle ${id}`

  if (event.target.dataset.id === "deleteSaved") {
    document.getElementById(`saved ${target.id}`).innerHTML = `<br><br><br><br><h5>This article has been removed from your saved articles.</h5><br><br><br><br><hr>`
  }

  Adapter.loadSavedArticles().then(function(json) {
    let userArticles = json.userArticles

    let article = json.articles.find(function(el) {
      return el.url === target.url
    })

    let userArt = userArticles.find(function(el) {
      return el.article_id === article.id
    })

    Adapter.delArticle(`${userArt.id}`)
  })
}

// clean up code in INDEX.JS 
// function renderGrid(articles) {
  
//     articles.forEach(function(article) {
//       // console.log(article.source.name)
//       let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
//       newArticle.renderPreview();
//   })
// }