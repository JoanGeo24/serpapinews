const api_key = '4c181e103e2bf8e1dafa966c36b38f4be4aed1beb5b131014e88b6201a2fc7f0';
const api_url = `https://serpapi.com/search.json?apikey=${api_key}`;

let today_news = fetch(`${api_url}&q=today+news&tbm=nws`).then(response => response.json()).then(response => {
    console.log(response);
    if (response.Error) {
        alert(response.Error);
        return;
    }

    var news = response.news_results;
        createNews(news);

    })

let search = (query) => {
    today_news = '';
    fetch(`${api_url}&q=${query}&tbm=nws`).then(response => response.json()).then(response => {
        console.log(response);
        if (response.Error) {
            alert(response.Error);
            return;
        }

        var news = response.news_results;
        createNews(news);
        
    })
}

let createNews = (news) => {
    document.querySelector('#news').innerHTML = '';
    news.forEach(n => {
        var fetched_news = `<div class='col'><div class="card" style="width: 18rem;">
        <img src="${n.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${n.title}</h5>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${n.snippet}</li>
        <li class="list-group-item">Posted: ${n.date}</li>
        </ul>
        <a href="javascript:;" onclick="window.open('${n.link}')" class="btn btn-primary">Show More</a>
        </div>
      </div></div>`;
        document.querySelector('#news').innerHTML += fetched_news;
    });
}

document.querySelector('#search-input').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (this.value.length <= 1) {
            alert('Need more clues');
            return;
        }
        search(this.value);
    }
});

document.querySelector('#search-btn').addEventListener('click', function (e) {
    var query = document.querySelector('#search-input').value;
    if (query.length <= 1) {
        alert('Need more clues');
        return;
    }
    search(query);
});

