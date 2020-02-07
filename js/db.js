var dbPromised = idb.open("socces", 1, function (upgradeDb) {
    var clubsObjectStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id"
    });
    clubsObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
});

function saveForLater(club) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("clubs", "readwrite");
            var store = tx.objectStore("clubs");
            console.log(club);
            store.put(club);
            return tx.complete;
        })
        .then(function () {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("clubs", "readonly");
                var store = tx.objectStore("clubs");
                return store.getAll();
            })
            .then(function (club) {
                resolve(club);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("clubs", "readonly");
                var store = tx.objectStore("clubs");
                return store.get(id);
            })
            .then(function (club) {
                resolve(club);
            });
    });
}

var deleteClubs = (id) => {
    dbPromised.then(db => {
        var tx = db.transaction('clubs', 'readwrite');
        var store = tx.objectStore('clubs');
        store.delete(id);
        return tx.complete;
    }).then(() => {
        M.toast({
            html: 'Club Sudah Di Hapus Dari Daftar Favorite!'
        });
        getSavedClubs();
    }).catch(err => {
        console.error('Error: ', err);
    });
}

var deleteClubListener = id => {
    var c = confirm("Club Akan Di hapus Dari Daftar Favorite?")
    if (c == true) {
        deleteClubs(id);
    }
}