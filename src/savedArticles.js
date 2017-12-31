function renderSavedArticles() {
  Adapter.loadSavedArticles().then(function(json) {
    let articles = json.articles;
    document.getElementById('content').innerHTML = `
    <div class="container">
    <h3>Your Saved Articles</h3><hr><br><br>
    <div class="container">
    <div class="row" id="saved"></div>
    `

    articles.reverse().forEach(function(el) {
      let frontId = Article.all().find(function(art) {
          return art.url === el.url
        })

      document.getElementById('saved').innerHTML += `
      <div class="row" id="saved ${frontId.id}">
        <div class="col col-sm-4 col-md-4 col-lg-4">
        <a href=${el.url} target="_blank">
          <img src=${el.urlToImage} style="width: 100%">
        </a></div>
        <div class="col col-sm-8 col-md-8 col-lg-8">
        <h4>${el.title}</h4><br>
        <h5>${el.source}</h5><br>
        <p>${el.description}<br>
        ${el.publishedAt}</p>
        <button type="button" class="btn btn-outline-info" style="float: right" data-id="deleteSaved" id="deleteArticle ${frontId.id}"> o </button><br><br><hr></div></div>
      `
    })
  })
}