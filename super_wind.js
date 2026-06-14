// Ce code utilise l'API officielle de Sandboxels pour les mods
runAfterLoad(function() {
    
    // On définit le Super Vent
    elements.super_wind = {
        color: "#aae0f0",
        behavior: behaviors.GAS, // Se comporte comme un gaz pour se propager
        category: "energy",      // Il se rangera avec Feu, Laser, Foudre, etc.
        state: "gas",
        density: 0.1,            // Très léger pour voler au milieu des nuages
        excludeRandom: true,     // Empêche le jeu de le générer au hasard
        tick: function(pixel) {
            // Zone d'effet : le vent souffle et pousse
            for (let i = -3; i <= 3; i++) {
                for (let j = -3; j <= 3; j++) {
                    let neighbor = getPixel(pixel.x + i, pixel.y + j);
                    
                    // Si le pixel voisin est un nuage ou un gaz, on le propulse vers la droite
                    if (neighbor && (neighbor.element.includes("cloud") || neighbor.element === "steam" || neighbor.element === "hydrogen")) {
                        movePixel(neighbor, pixel.x + i + 3, pixel.y + j);
                    }
                }
            }
            // Le vent se dissipe peu à peu (7% de chance par frame)
            if (Math.random() < 0.07) {
                deletePixel(pixel.x, pixel.y);
            }
        }
    };

    // On s'assure que le bouton apparaît bien dans la liste du jeu
    if (typeof eList !== "undefined" && !eList.includes("super_wind")) {
        eList.push("super_wind");
    }
});
