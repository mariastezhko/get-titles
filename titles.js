const https = require('https');

function getMovieTitles(substr) {
    let baseUrl = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr

    var movieTitles = [];
    var pagesNum;

    let myUrl1 = baseUrl + '&page=1';
    https.get(myUrl1, (resp) => {
        let data = "";

        resp.on('data', (d) => {
            data += d;
        });

        resp.on('end', () => {
            var myData = JSON.parse(data);
            pagesNum = myData.total_pages;
            console.log("pages: ", pagesNum);

            for (let i=1; i<=pagesNum; i++) {


                    console.log("current page: ", i);
                    let myUrl2 = baseUrl + '&page=' + i;
                    console.log("sending request with current page ", i);
                    https.get(myUrl2, (resp) => {
                        let data = "";

                        resp.on('data', (d) => {
                            data += d;
                        });

                        resp.on('end', () => {
                            var apiPromises = [];
                            var myData = JSON.parse(data);
                            var myTitles = myData.data;
                            for (let i=0; i<myTitles.length; i++) {
                              movieTitles.push(myTitles[i].Title);
                            }
                            movieTitles.sort();
                            console.log(movieTitles);

                        })
                    }).on("error", (err) => {
                          console.log("Error: " + err.message);
                        });

            }

        })
    }).on("error", (err) => {
          console.log("Error: " + err.message);
        });


}

getMovieTitles('spiderman');
