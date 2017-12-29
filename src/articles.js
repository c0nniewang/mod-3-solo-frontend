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
      <a href=${this.url}>
        <img src=${this.urlToImage} style="width: 100%">
      </a>
      <div class="caption">
        <p>${this.title}<br>
        ${this.source}<br>
        ${this.publishedAt}
        <button type="button" class="btn btn-outline-info" style="float: right" data-id=${this.id} id="addArticle"> + </button>
        </p>
      </div>`
      return article;
  }
}


// clean up code in INDEX.JS 
// function renderGrid(articles) {
  
//     articles.forEach(function(article) {
//       // console.log(article.source.name)
//       let newArticle = new Article(article.url, article.title, article.author, article.publishedAt, article.source.name, article.description, article.urlToImage);
//       newArticle.renderPreview();
//   })
// }