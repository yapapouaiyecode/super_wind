// Définition de l'élément de vent
elements.super_wind = {
    color: "#aae0f0",
    name: "Super Vent",
    behavior: behaviors.GAS,
    category: "energy", // Il va s'ajouter dans l'onglet Énergie de ton image
    state: "gas",
    density: 0.1,
    excludeRandom: true,
    tick: function(pixel) {
        // Le vent pousse tout vers la droite dans un rayon de 3 cases
        for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
                let neighbor = getPixel(pixel.x + i, pixel.y + j);
                if (neighbor && neighbor.element !== "super_wind") {
                    // Pousse les nuages, la vapeur et les gaz légers
                    if (neighbor.element.includes("cloud") || neighbor.element === "steam" || neighbor.element === "hydrogen") {
                        movePixel(neighbor, pixel.x + i + 3, pixel.y + j);
                    }
                }
            }
        }
        // Le vent disparaît après avoir soufflé
        if (Math.random() < 0.08) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

// Injection immédiate dans l'interface du site
if (typeof eList !== "undefined") {
    eList.push("super_wind");
    createGrid(); // Force le site à mettre à jour la liste des boutons
}
