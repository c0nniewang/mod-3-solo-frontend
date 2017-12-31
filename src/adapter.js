class Adapter {

  static loadSavedArticles() {
    return fetch('http://localhost:3000/api/v1/users/1').then(function(resp){return resp.json()})
  }

  static loadBusinessArticles() {
    return fetch('https://newsapi.org/v2/top-headlines?category=business&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) { return resp.json()})
  }

  static loadPolitics() {
    return fetch('https://newsapi.org/v2/top-headlines?category=politics&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) {return resp.json()})
  }

  static loadTech() {
    return fetch('https://newsapi.org/v2/top-headlines?category=technology&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) {return resp.json()})
  }

  static createArticle(article) {
    return fetch('http://localhost:3000/api/v1/articles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: `${article.url}`, title: `${article.title}`, author: `${article.author}`, publishedAt: `${article.publishedAt}`, source: `${article.source}`, description: `${article.description}`, urlToImage: `${article.urlToImage}`})
      }).then(function(resp) {return resp.json()})
  }

  static createUserArticle(article_id, user_id) {
    return fetch('http://localhost:3000/api/v1/user_articles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({article_id: `${article_id}`, user_id: `${user_id}`})
    })
  }
  
  // is there a way to build the find function into the fetch request??????
  static getArticles() {
    return fetch(`http://localhost:3000/api/v1/articles`).then(function(resp){return resp.json()})
  }

  static delArticle(id) {
    return fetch(`http://localhost:3000/api/v1/user_articles/${id}`, {
      method: 'DELETE'
    })
  }
}