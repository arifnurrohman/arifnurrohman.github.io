const base_url = "https://api.football-data.org/";
const api_token = 'f63496eb416f460cbad31c388d8a5363'

var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getStandings() {
    if ('caches' in window) {
        caches.match(base_url + "v2/competitions/2021/standings").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var standingsHTML = "";
                    data.standings[0].table.forEach(function (standing) {
                        standingsHTML += `
                        <tr>
                            <td>${standing.position}</td>
                            <td><img src="${standing.team.crestUrl}" width="30px" height="30px" alt="badge"/></td>
                            <td>${standing.team.name}</td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                        </tr>
                        `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #content
                    document.getElementById("standings").innerHTML = standingsHTML;
                })
            }
        })
    }

    fetchApi(base_url + "v2/competitions/2021/standings")
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            var standingsHTML = "";
            data.standings[0].table.forEach(function (standing) {
                standing = JSON.parse(JSON.stringify(standing).replace(/http:/g, 'https:'));
                standingsHTML += `
                <tr>
                            <td>${standing.position}</td>
                            <td><img src="${standing.team.crestUrl}" width="30px" height="30px" alt="badge"/></td>
                            <td>${standing.team.name}</td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                        </tr>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("standings").innerHTML = standingsHTML;
        })
        .catch(error);
}

function getClubs() {
    if ('caches' in window) {
        caches.match(base_url + "v2/competitions/2021/teams").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var teamsHTML = "";
                    data.teams.forEach(function (team) {
                        teamsHTML += `
                        <div class="col s12 m6 l4">
                             <div class="card">
                                <div class="card-content">
                                    <div class="center">
                                        <a href="./club-detail.html?id=${team.id}">
                                            <img src="${team.crestUrl}"/>
                                        </a>
                                    </div>
                                    <div class="center" id="name-club">
                                        ${team.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #content
                    document.getElementById("clubs").innerHTML = teamsHTML;
                })
            }
        })
    }

    fetchApi(base_url + "v2/competitions/2021/teams")
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            var teamsHTML = "";
            data.teams.forEach(function (team) {
                team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
                teamsHTML += `
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-content">
                            <div class="center">
                                <a href="./club-detail.html?id=${team.id}">
                                    <img src="${team.crestUrl}"/>
                                </a>
                            </div>
                            <div class="center" id="name-club">
                                ${team.name}
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("clubs").innerHTML = teamsHTML;
        })
        .catch(error);
}


function getClubById() {
    return new Promise(function (resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(base_url + "v2/teams/" + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        var clubHTML = `
                    <h1 class="center-align">${data.name}</h1>
                    <div class="logo center-align">
                        <img src="${data.crestUrl}" alt="" width="200px">
                    </div>
                    `;
                        var tableSquadHTML = "";
                        data.squad.forEach(function (sq) {
                            tableSquadHTML += `
                        <tr>
                            <td>${sq.shirtNumber}</td>
                            <td>${sq.name}</td>
                            <td>${sq.position}</td>
                            <td>${sq.role}</td>
                        </tr>
                        `;
                        });
                        // Sisipkan komponen card ke dalam elemen dengan id #content
                        document.getElementById("body-content").innerHTML = clubHTML;
                        document.getElementById("squad").innerHTML = tableSquadHTML;
                        resolve(data);
                    });
                }
            });
        }
        fetchApi(base_url + "v2/teams/" + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                // Objek JavaScript dari response.json() masuk lewat variabel data.
                console.log(data);
                // Menyusun komponen card artikel secara dinamis
                data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
                var clubHTML = `
                <h1 class="center-align">${data.name}</h1>
                <div class="logo center-align">
                    <img src="${data.crestUrl}" alt="" width="200px">
                </div>
            `;
                var tableSquadHTML = "";
                data.squad.forEach(function (sq) {
                    tableSquadHTML += `
                <tr>
                    <td>${sq.shirtNumber}</td>
                    <td>${sq.name}</td>
                    <td>${sq.position}</td>
                    <td>${sq.role}</td>
                </tr>
                `;
                });
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("body-content").innerHTML = clubHTML;
                document.getElementById("squad").innerHTML = tableSquadHTML;
                resolve(data);
            });
    });
}

function getSavedClubs() {
    getAll().then(function (clubs) {
        console.log(clubs);
        // Menyusun komponen card artikel secara dinamis
        var clubsHTML = "";
        clubs.forEach(function (club) {
            clubsHTML += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-content center-align">
                        <a href="./club-detail.html?id=${club.id}&saved=true">
                            <img src="${club.crestUrl}"/>
                        </a>
                        <div class="center" id="name-club">
                            ${club.name}
                        </div>
                    </div>
                    <div class="card-action center-align">
                        <a class="btn-block waves-effect waves-light btn-small red" onclick="deleteClubListener(${club.id})">Delete</a>
                    </div>
                </div>
            </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("clubs").innerHTML = clubsHTML;
    });
}