// On attend que les éléments de base du jeu soient chargés
window.addEventListener('load', function() {
    
    // Définition de notre nouvel élément de vent
    elements.super_wind = {
        color: "#aae0f0",
        behavior: behaviors.GAS, // Il se comporte comme un gaz pour se déplacer
        category: "energy",      // Il sera rangé dans l'onglet "Energy"
        temp: 20,
        state: "gas",
        density: 0.1,            // Très léger pour monter et bouger vite
        tick: function(pixel) {
            // Force le déplacement des pixels voisins (effet de vent)
            for (let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                    let neighbor = getPixel(pixel.x + i, pixel.y + j);
                    // Si on trouve un pixel qui est un gaz ou un nuage, on le pousse vers la droite
                    if (neighbor && (neighbor.element === "cloud" || neighbor.element === "rain_cloud" || neighbor.element === "steam" || neighbor.element === "hydrogen")) {
                        movePixel(neighbor, pixel.x + i + 2, pixel.y + j);
                    }
                }
            }
            // Le vent finit par disparaître après avoir soufflé (5% de chance par frame)
            if (Math.random() < 0.05) {
                deletePixel(pixel.x, pixel.y);
            }
        }
    };

    // On rafraîchit le jeu pour intégrer le nouvel élément
    if (typeof eList !== "undefined") {
        eList.push("super_wind");
    }
});
