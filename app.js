// Claves de almacenamiento en localStorage
const STORAGE_KEYS = {
    REGISTROS: "birdwatch_registros_v1",
    USUARIO: "birdwatch_usuario_activo",
    USUARIOS_CUSTOM: "birdwatch_usuarios_custom",
    ESPECIES_CUSTOM: "birdwatch_especies_custom",
    LUGARES_CUSTOM: "birdwatch_lugares_custom"
};

const USUARIOS_BASE = ["Judriguez", "UkeFania", "DavidSaurio", "Admin1"];

// Referencias del DOM
const form = document.getElementById("formAvistamiento");
const inputUsuario = document.getElementById("usuario");
const datalistUsuarios = document.getElementById("listaUsuarios");
const btnCambiarUsuario = document.getElementById("btnCambiarUsuario");
const inputAve = document.getElementById("aveInput");
const listaSugerencias = document.getElementById("sugerenciasAves");
const estadoTaxonomia = document.getElementById("estadoTaxonomia");
const inputFecha = document.getElementById("fecha");
const inputCantidad = document.getElementById("cantidad");
const inputLugar = document.getElementById("lugar");
const datalistLugares = document.getElementById("listaLugares");

const listaRegistrosEl = document.getElementById("listaRegistros");
const contadorRegistrosEl = document.getElementById("contadorRegistros");
const contadorBtnEl = document.getElementById("contadorBtn");
const btnDescargarCSV = document.getElementById("btnDescargarCSV");
const btnVaciarCache = document.getElementById("btnVaciarCache");
const toastEl = document.getElementById("toast");

// Estado en memoria sincronizado con localStorage
let registros = [];
let catalogoCompleto = [];

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    inicializarFechaHoy();
    cargarUsuarioGuardado();
    cargarCatalogos();
    cargarRegistrosDesdeCache();
    registrarEventos();
});

function inicializarFechaHoy() {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    inputFecha.value = `${yyyy}-${mm}-${dd}`;
}

function cargarUsuarioGuardado() {
    const usuarioGuardado = localStorage.getItem(STORAGE_KEYS.USUARIO);
    if (usuarioGuardado) {
        inputUsuario.value = usuarioGuardado;
    }
}

function cargarCatalogos() {

    // Cargar usuarios base + usuarios nuevos guardados en caché
    const customUsuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS_CUSTOM) || "[]");
    const todosUsuarios = Array.from(new Set([...USUARIOS_BASE, ...customUsuarios])).sort();

    datalistUsuarios.innerHTML = "";
    todosUsuarios.forEach(user => {
        const option = document.createElement("option");
        option.value = user;
        datalistUsuarios.appendChild(option);
    });


    // Combinar catálogo base con especies personalizadas guardadas previamente
    const customEspecies = JSON.parse(localStorage.getItem(STORAGE_KEYS.ESPECIES_CUSTOM) || "[]");
    catalogoCompleto = [...CATALOGO_AVES];

    customEspecies.forEach(cientifico => {
        const existe = catalogoCompleto.some(a => a.cientifico.toLowerCase() === cientifico.toLowerCase());
        if (!existe) {
            catalogoCompleto.push({ cientifico, comunes: ["Agregada por usuario"] });
        }
    });

    // Cargar lugares frecuentes + lugares guardados por el usuario
    const customLugares = JSON.parse(localStorage.getItem(STORAGE_KEYS.LUGARES_CUSTOM) || "[]");
    const todosLugares = Array.from(new Set([...LUGARES_FRECUENTES, ...customLugares])).sort();

    datalistLugares.innerHTML = "";
    todosLugares.forEach(lugar => {
        const option = document.createElement("option");
        option.value = lugar;
        datalistLugares.appendChild(option);
    });
}

function cargarRegistrosDesdeCache() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.REGISTROS);
        registros = data ? JSON.parse(data) : [];
    } catch (e) {
        registros = [];
    }
    renderizarRegistros();
}

function guardarRegistrosEnCache() {
    localStorage.setItem(STORAGE_KEYS.REGISTROS, JSON.stringify(registros));
    renderizarRegistros();
}

// Normaliza texto (quita tildes y pasa a minúsculas) para búsquedas flexibles
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim();
}

function registrarEventos() {
    // Limpiar usuario para cambiar de observador
    btnCambiarUsuario.addEventListener("click", () => {
        inputUsuario.value = "";
        inputUsuario.focus();
    });

    // Autocompletado inteligente de aves (busca por nombre común o científico)
    inputAve.addEventListener("input", () => {
        const consulta = normalizarTexto(inputAve.value);
        if (consulta.length < 2) {
            ocultarSugerencias();
            estadoTaxonomia.textContent = "Al seleccionar una opción se guardará el nombre científico oficial.";
            return;
        }

        const coincidencias = catalogoCompleto.filter(ave => {
            const matchCientifico = normalizarTexto(ave.cientifico).includes(consulta);
            const matchComun = ave.comunes.some(c => normalizarTexto(c).includes(consulta));
            return matchCientifico || matchComun;
        });

        mostrarSugerencias(coincidencias);
    });

    // Cerrar lista de sugerencias si se toca fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".autocomplete-wrapper")) {
            ocultarSugerencias();
        }
    });

    // Envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        guardarNuevoAvistamiento();
    });

    // Descargar archivo CSV
    btnDescargarCSV.addEventListener("click", exportarACSV);

    // Vaciar caché con confirmación
    btnVaciarCache.addEventListener("click", () => {
        if (registros.length === 0) return;
        const confirmar = confirm(
            `¿Seguro que deseas eliminar los ${registros.length} registros almacenados en este celular? Asegúrate de haber descargado el CSV antes.`
        );
        if (confirmar) {
            registros = [];
            guardarRegistrosEnCache();
            mostrarToast("Caché vaciado correctamente");
        }
    });
}

function mostrarSugerencias(lista) {
    listaSugerencias.innerHTML = "";

    if (lista.length === 0) {
        ocultarSugerencias();
        estadoTaxonomia.textContent = "Especie no listada: se guardará tal como la escribiste.";
        return;
    }

    lista.slice(0, 8).forEach(ave => {
        const li = document.createElement("li");
        li.className = "autocomplete-item";
        li.innerHTML = `
            <span class="sci-name">${ave.cientifico}</span>
            <span class="common-names">${ave.comunes.join(" · ")}</span>
        `;

        li.addEventListener("click", () => {
            inputAve.value = ave.cientifico;
            estadoTaxonomia.textContent = `✓ Seleccionado: ${ave.cientifico} (${ave.comunes[0]})`;
            ocultarSugerencias();
            inputLugar.focus();
        });

        listaSugerencias.appendChild(li);
    });

    listaSugerencias.classList.remove("hidden");
}

function ocultarSugerencias() {
    listaSugerencias.classList.add("hidden");
}

function guardarNuevoAvistamiento() {
    const usuario = inputUsuario.value.trim();
    const aveRaw = inputAve.value.trim();
    const fecha = inputFecha.value;
    const lugar = inputLugar.value.trim();
    const cantidad = parseInt(inputCantidad.value, 10);

    if (!usuario || !aveRaw || !fecha || !lugar || isNaN(cantidad) || cantidad < 1) {
        mostrarToast("Por favor completa todos los campos obligatorios");
        return;
    }

    // Capitalizar nombre científico si fue escrito manualmente (Ej. "asio flammeus" -> "Asio flammeus")
    const aveNormalizada = formatearNombreCientifico(aveRaw);

    // Recordar usuario para próximos registros
    localStorage.setItem(STORAGE_KEYS.USUARIO, usuario);

    // AQUÍ LE PASAMOS TAMBIÉN EL USUARIO (antes solo pasaba aveNormalizada y lugar)
    aprenderDatoNuevo(usuario, aveNormalizada, lugar);

    const nuevoRegistro = {
        idLocal: Date.now(),
        ave: aveNormalizada,
        fecha: fecha,
        lugar: lugar,
        cantidad: cantidad,
        usuario: usuario
    };

    registros.unshift(nuevoRegistro); // Agregar al inicio para verlo de primero
    guardarRegistrosEnCache();

    // Limpiar solo los campos variables, conservando usuario, fecha y lugar por comodidad en campo
    inputAve.value = "";
    inputCantidad.value = 1;
    estadoTaxonomia.textContent = "Al seleccionar una opción se guardará el nombre científico oficial.";
    inputAve.focus();

    mostrarToast(`✓ ${aveNormalizada} guardado en caché`);
}

function formatearNombreCientifico(nombre) {
    const limpio = nombre.replace(/;/g, ",").trim();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

// AQUÍ RECIBIMOS LOS 3 DATOS: usuario, ave y lugar
function aprenderDatoNuevo(usuario, ave, lugar) {
    // 1. Guardar usuario nuevo si no existe en la lista
    const customUsuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS_CUSTOM) || "[]");
    const todosUsuarios = [...USUARIOS_BASE, ...customUsuarios];
    if (!todosUsuarios.some(u => u.toLowerCase() === usuario.toLowerCase())) {
        customUsuarios.push(usuario);
        localStorage.setItem(STORAGE_KEYS.USUARIOS_CUSTOM, JSON.stringify(customUsuarios));
        cargarCatalogos();
    }

    // 2. Guardar especie nueva si no existe en el catálogo
    const existeAve = catalogoCompleto.some(a => a.cientifico.toLowerCase() === ave.toLowerCase());
    if (!existeAve) {
        const customEspecies = JSON.parse(localStorage.getItem(STORAGE_KEYS.ESPECIES_CUSTOM) || "[]");
        customEspecies.push(ave);
        localStorage.setItem(STORAGE_KEYS.ESPECIES_CUSTOM, JSON.stringify(customEspecies));
        catalogoCompleto.push({ cientifico: ave, comunes: ["Agregada por usuario"] });
    }

    // 3. Guardar lugar nuevo si no existe en la lista
    const customLugares = JSON.parse(localStorage.getItem(STORAGE_KEYS.LUGARES_CUSTOM) || "[]");
    const todosLugares = [...LUGARES_FRECUENTES, ...customLugares];
    if (!todosLugares.some(l => l.toLowerCase() === lugar.toLowerCase())) {
        customLugares.push(lugar);
        localStorage.setItem(STORAGE_KEYS.LUGARES_CUSTOM, JSON.stringify(customLugares));
        cargarCatalogos();
    }
}

function renderizarRegistros() {
    const total = registros.length;
    contadorRegistrosEl.textContent = total;
    contadorBtnEl.textContent = total;

    btnDescargarCSV.disabled = total === 0;
    btnVaciarCache.disabled = total === 0;

    if (total === 0) {
        listaRegistrosEl.innerHTML = `
            <div class="empty-state">
                <p>Aún no tienes avistamientos guardados en este dispositivo.</p>
                <small>Los registros que agregues permanecerán aquí aunque cierres el navegador o pierdas señal.</small>
            </div>
        `;
        return;
    }

    listaRegistrosEl.innerHTML = "";
    registros.forEach((reg, index) => {
        const item = document.createElement("div");
        item.className = "record-item";
        item.innerHTML = `
            <div class="record-info">
                <h3>${escaparHTML(reg.ave)}</h3>
                <div class="record-meta">
                    📅 ${reg.fecha} · 📍 ${escaparHTML(reg.lugar)} · 👤 ${escaparHTML(reg.usuario)}
                </div>
            </div>
            <span class="record-badge">×${reg.cantidad}</span>
            <button type="button" class="btn-delete-item" title="Eliminar este registro" aria-label="Eliminar registro">✕</button>
        `;

        item.querySelector(".btn-delete-item").addEventListener("click", () => {
            eliminarRegistroIndividual(index);
        });

        listaRegistrosEl.appendChild(item);
    });
}

function eliminarRegistroIndividual(index) {
    registros.splice(index, 1);
    guardarRegistrosEnCache();
    mostrarToast("Registro eliminado");
}

function exportarACSV() {
    if (registros.length === 0) return;

    // Encabezado idéntico al esperado por el módulo de importación en Java
    const lineas = ["ID;Nombre Ave;Fecha;Lugar;Cantidad;Usuario"];

    // Ordenar cronológicamente del más antiguo al más reciente para exportar
    const ordenados = [...registros].reverse();

    ordenados.forEach((reg, idx) => {
        const idSecuencial = idx + 1;
        const aveLimpia = reg.ave.replace(/;/g, ",");
        const lugarLimpio = reg.lugar.replace(/;/g, ",");
        const usuarioLimpio = reg.usuario.replace(/;/g, ",");

        lineas.push(`${idSecuencial};${aveLimpia};${reg.fecha};${lugarLimpio};${reg.cantidad};${usuarioLimpio}`);
    });

    const contenidoCSV = lineas.join("\n");
    // BOM UTF-8 (﻿) para preservar tildes y caracteres especiales
    const blob = new Blob(["\uFEFF" + contenidoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const hoy = new Date().toISOString().slice(0, 10);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `birdwatch_campo_${hoy}.csv`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);

    mostrarToast("Archivo CSV descargado correctamente");
}

function escaparHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

let toastTimer;
function mostrarToast(mensaje) {
    toastEl.textContent = mensaje;
    toastEl.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.add("hidden");
    }, 2800);
}
