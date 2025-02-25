document.addEventListener("DOMContentLoaded", async () => {

    // Navbar HTML in jeweilige Seite einbauen
    const navbarHtml = `
        <nav class="navbar sticky-top navbar-expand-lg" style="background-color: #292c33;">
            <div class="container-fluid">
                <a class="navbar-brand" id="navbar-brand-link" href="../index.html" style="color: white">ComPeteHub</a>
                <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

                    <div class="flex-d">
                        <button class="btn btn-secondary ms-3" id="hilfeseite-button">Hilfe</button>
                        <button class="btn btn-secondary ms-3" id="logOut-button">Abmelden</button>
                    </div>
                </div>
            </div>
        </nav>
    `;
    const navbarContainer = document.createElement("div");
    navbarContainer.innerHTML = navbarHtml;
    document.body.prepend(navbarContainer); // Navbar am Anfang einfügen

    setupNavbarLogic();
    
});

async function setupNavbarLogic() {
    let logInOutButton = document.getElementById("logOut-button");

    logInOutButton.addEventListener("click", async () => {
        //Logout regeln:
        try {
            //Anfrage an Logout-Endpoint
            //TODO 
            console.log("Abmeldung gestartet...")
            await axios.post('http://localhost:8080/v1/user/logout', {}, { withCredentials: true });
            alert("Abgemeldet.");

            //Weiterleitung zur Anmeldeseite
            window.location.href = "http://localhost:8081/html/Anmeldung.html";
        } catch (error) {
            console.error("Logout fehlgeschlagen.");
            alert("Irgendwas ist schiefgelaufen.");
        }
    });

    //Hilfeseite-Button - immer anzeigen
    document.getElementById("hilfeseite-button").addEventListener("click", async () => {
        window.location.href = "http://localhost:8081/html/Hilfe.html";});

    // Überprüfung, ob Benutzer angemeldet ist - ggf. Navbar anpassen (logOut-Button ausblenden)
        try{
            const response = await axios.post('http://localhost:8080/v1/user/start-session', {}, {withCredentials: true});                   
            console.log("Navbar: Benutzer ist angemeldet.")
        } 
        catch(error) {
            //Fehler = angemeldet -> Button nicht anzeigen & Link von Logo entfernen
            console.log("Navbar: Benutzer ist nicht angemeldet.")
            logInOutButton.classList.toggle("d-none");
            document.getElementById("navbar-brand-link").href = "#";
        }
    
}
