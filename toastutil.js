function showToast(title, body) {
    console.log(title + body); // Gibt den Titel und den Inhalt der Toast-Nachricht in der Konsole aus

    $('#toast-header').text(title); // Setzt den Text des Toast-Titels auf den angegebenen Titel
    $('#toast-body').text(body); // Setzt den Text des Toast-Inhalts auf den angegebenen Inhalt

    bootstrap.Toast.getOrCreateInstance($('#liveToast')).show(); // Ruft die Bootstrap Toast-Instanz ab oder erstellt eine neue Instanz und zeigt den Toast an
}
