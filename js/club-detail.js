document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var btnSave = document.getElementById("save");
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';

        // ambil artikel lalu tampilkan
        getClubById();
    } else {
        var item = getClubById();
    }
    btnSave.onclick = function () {
        console.log("Tombol FAB di klik.");
        M.toast({
            html: 'Berhasil Ditambahkan Ke Favorite'
        });
        item.then(function (club) {
            saveForLater(club);
        });
    };
});