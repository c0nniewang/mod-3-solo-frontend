class Adapter {

  static loadBusinessArticles() {
    return fetch('https://newsapi.org/v2/top-headlines?category=business&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) { return resp.json()})
  }

  static loadPolitics() {
    return fetch('https://newsapi.org/v2/top-headlines?category=politics&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) {return resp.json()})
  }

  static loadTech() {
    return fetch('https://newsapi.org/v2/top-headlines?category=technology&apiKey=6c0f6782bcf6478abe45cb1e2f280b58').then(function(resp) {return resp.json()})
  }
}