/**
 * Catálogo taxonómico local de BIRDWATCH
 * Estructura: Un nombre científico único asociado a múltiples nombres comunes o regionales.
 */
const CATALOGO_AVES = [
    // --- BÚHOS Y RAPACES NOCTURNAS ---
    { cientifico: "Asio flammeus", comunes: ["Búho campestre", "Búho orejicorto", "Lechuzón de campo"] },
    { cientifico: "Asio stygius", comunes: ["Búho negruzco", "Búho estigio", "Lechuzón negruzco"] },
    { cientifico: "Asio clamator", comunes: ["Búho listado", "Búho rayado", "Lechuzón orejudo"] }, //
    { cientifico: "Megascops choliba", comunes: ["Currucutú común", "Currucutú", "Autillo tropical", "Búho currucutú"] },
    { cientifico: "Tyto alba", comunes: ["Lechuza común", "Lechuza de campanario"] },

    // --- RAPACES DIURNAS ---
    { cientifico: "Elanus leucurus", comunes: ["Elanio maromero", "Gavilán maromero", "Gavilán bailarín", "Aguilucho blanco"] }, //
    { cientifico: "Rupornis magnirostris", comunes: ["Gavilán caminero", "Gavilán pollero", "Aguililla caminera"] }, //
    { cientifico: "Falco sparverius", comunes: ["Cernícalo americano", "Halconcito colorado", "Quilico"] },
    { cientifico: "Coragyps atratus", comunes: ["Gallinazo común", "Chulo", "Zamuro", "Golero"] }, //
    { cientifico: "Cathartes aura", comunes: ["Guala cabecirroja", "Gallinazo cabeza roja", "Aura tiñosa"] },

    // --- PALOMAS Y TORCAZAS ---
    { cientifico: "Zenaida auriculata", comunes: ["Torcaza nagüiblanca", "Torcaza", "Abuelita", "Paloma sabanera", "Tórtola orejuda"] }, //
    { cientifico: "Columba livia", comunes: ["Paloma común", "Paloma doméstica", "Paloma de plaza", "Paloma bravía"] },
    { cientifico: "Patagioenas fasciata", comunes: ["Paloma collareja", "Torcaza morada", "Paloma de nuca blanca"] },

    // --- MIRLAS, SINSONTES Y CHAMONES ---
    { cientifico: "Turdus fuscater", comunes: ["Mirla patinaranja", "Mirla grande", "Chiguaco", "Paraulata"] }, //
    { cientifico: "Turdus ignobilis", comunes: ["Mirla negra", "Mirla embarradora", "Mirla piquinegra", "Ollera"] },
    { cientifico: "Mimus gilvus", comunes: ["Mirla blanca", "Sinsonte común", "Sinsonte", "Paraulata llanera", "Chulingo"] },
    { cientifico: "Molothrus bonariensis", comunes: ["Chamón parásito", "Chamón", "Tordo renegrido", "Mirlo negro"] }, //

    // --- GARRAPATEROS ---
    { cientifico: "Crotophaga major", comunes: ["Garrapatero mayor", "Garrapatero grande", "Pijuy grande"] },
    { cientifico: "Crotophaga ani", comunes: ["Garrapatero común", "Garrapatero piquiliso", "Chamón garrapatero", "Firigüelo"] },

    // --- AVES ACUÁTICAS, TINGUAS Y GARZAS ---
    { cientifico: "Porphyriops melanops", comunes: ["Tingua moteada", "Polla pintada", "Tingua pico verde"] }, //
    { cientifico: "Gallinula galeata", comunes: ["Tingua pico rojo", "Polla de agua", "Gallareta"] },
    { cientifico: "Rallus semiplumbeus", comunes: ["Tingua bogotana", "Rascón andino"] },
    { cientifico: "Fulica americana", comunes: ["Focha americana", "Focha", "Tingua pico amarillo", "Gallareta americana"] }, //
    { cientifico: "Podilymbus podiceps", comunes: ["Zambullidor piquipintado", "Zambullidor piquipinto", "Pato zambullidor", "Buzo"] }, //
    { cientifico: "Oxyura jamaicensis", comunes: ["Pato turrio", "Pato andino", "Pato zambullidor rojizo"] }, //
    { cientifico: "Anas georgica", comunes: ["Pato pico de oro", "Pato maicero", "Pato paramuno"] },
    { cientifico: "Spatula discors", comunes: ["Pato barraquete", "Cerceta aliazul", "Pato canadiense"] },
    { cientifico: "Bubulcus ibis", comunes: ["Garza bueyera", "Garcita del ganado", "Garza garrapatera"] },
    { cientifico: "Butorides virescens", comunes: ["Garcita verde", "Garza azulada"] },
    { cientifico: "Ardea alba", comunes: ["Garza real", "Garza blanca grande", "Garceta grande"] },
    { cientifico: "Vanellus chilensis", comunes: ["Alcaraván", "Pellar común", "Tero", "Tanga"] }, //

    // --- COLIBRÍES ---
    { cientifico: "Colibri coruscans", comunes: ["Colibrí chillón", "Colibrí orejivioleta", "Chupaflor", "Quinde herrero"] }, //[cite: 9]
    { cientifico: "Chaetocercus mulsant", comunes: ["Colibrí abeja", "Estrellita ventriblanca", "Chupaflor abeja"] }, //[cite: 10]
    { cientifico: "Lesbia victoriae", comunes: ["Colibrí colilargo negro", "Cometa colinegro"] },
    { cientifico: "Amazilia tzacatl", comunes: ["Amazilia colirrufa", "Colibrí colirrojo", "Quinde"] },

    // --- LOROS Y PERIQUITOS ---
    { cientifico: "Forpus conspicillatus", comunes: ["Cascabelito", "Periquito de anteojos", "Cotorrita de anteojos"] }, //[cite: 10]

    // --- TANGARAS, CARBONEROS Y GORRIONES ---
    { cientifico: "Zonotrichia capensis", comunes: ["Copetón", "Gorrión criollo", "Chingolo"] }, //[cite: 10]
    { cientifico: "Phrygilus unicolor", comunes: ["Gorrión de páramo", "Fringilo plomizo", "Pájaro de páramo"] },
    { cientifico: "Diglossa humeralis", comunes: ["Carbonero", "Picaflor negro", "Diglosa negra"] }, //[cite: 9]
    { cientifico: "Conirostrum rufum", comunes: ["Picocono rufo", "Conirrostro rufo", "Mielerito rufo"] }, //[cite: 10]
    { cientifico: "Anisognathus igniventris", comunes: ["Clarinero", "Tangara de montaña ventriescarlata", "Cachaquito"] }, //[cite: 10]
    { cientifico: "Thraupis episcopus", comunes: ["Azulejo común", "Azulejo", "Tangara azuleja"] },
    { cientifico: "Thraupis palmarum", comunes: ["Tangara palmera", "Azulejo palmero", "Verderón"] },
    { cientifico: "Spinus psaltria", comunes: ["Jilguero aliblanco", "Chisga", "Jilguero menor"] },

    // --- ATRAPAMOSCAS, CUCARACHEROS, CARPINTEROS Y OTROS ---
    { cientifico: "Tyrannus melancholicus", comunes: ["Sirirí común", "Sirirí", "Tirano melancólico", "Benteveo"] }, //[cite: 10]
    { cientifico: "Pyrocephalus rubinus", comunes: ["Titiribí", "Petirrojo", "Mosquero cardenal", "Atrapamoscas pechirrojo"] }, //[cite: 10]
    { cientifico: "Mecocerculus leucophrys", comunes: ["Mosquerito gorgiblanco", "Tiranillo gorgiblanco"] }, //[cite: 10]
    { cientifico: "Pitangus sulphuratus", comunes: ["Bichofué", "Bienteveo común", "Pechiamarillo", "Cristofué"] },
    { cientifico: "Troglodytes aedon", comunes: ["Cucarachero común", "Cucarachero", "Chochín", "Soterrey"] }, //[cite: 10]
    { cientifico: "Cistothorus apolinari", comunes: ["Cucarachero de pantano", "Chochín de Apolinar"] },
    { cientifico: "Synallaxis subpudica", comunes: ["Chamicero", "Chamicero cundiboyacense", "Rastrojero gorgiplateado"] }, //[cite: 9]
    { cientifico: "Phacellodomus striaticeps", comunes: ["Espinero frentiestriado", "Chamicero frentiestriado"] },
    { cientifico: "Picoides fumigatus", comunes: ["Carpintero pardo", "Carpintero ahumado"] }, //[cite: 10]
    { cientifico: "Chrysomus icterocephalus", comunes: ["Monjita cabeciamarilla", "Turpial de agua", "Tordo cabeciamarillo"] },
    { cientifico: "Myioborus ornatus", comunes: ["Abanico cariblanco", "Candelita frentiblanca"] },
    { cientifico: "Notiochelidon murina", comunes: ["Golondrina ventricafé", "Golondrina andina"] },
    { cientifico: "Sturnella magna", comunes: ["Chirlobirlo", "Alondra pradera", "Triguero"] }
];

const LUGARES_FRECUENTES = [
    "La Magdalena",
    "Humedal El Burro",
    "Parque Simón Bolívar",
    "Cerros Orientales",
    "Páramo de Sumapaz",
    "Jardín Botánico de Bogotá",
    "Humedal Santa María del Lago",
    "Humedal Jaboque",
    "Humedal Córdoba",
    "Parque El Virrey",
    "Humedal Tibanica",
    "Humedal La Conejera",
    "Monserrate",
    "Humedal Torca-Guaymaral",
    "Parque Chicaque",
    "Humedal de Juan Amarillo",
    "Humedal Capellanía",
    "Universidad Nacional",
    "Humedal Meandro del Say",
    "Humedal El Tunjo",
    "Parque Entre Nubes",
    "Humedal Tibabuyes",
    "Parque de los Novios",
    "Quebrada Las Delicias",
    "Humedal de Techo",
    "UPK",
    "Portal Américas"
];