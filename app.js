"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initSearchBar();
    initLoginForm();
    initSignupForm();
    initAboutPage();
});

/**
 * Barra de busqueda del navbar
 */
function initSearchBar() {
    const searchForm = document.getElementById("searchForm");
    if (!searchForm) return;

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = document.getElementById("searchInput").value.trim();
        console.log("Busqueda:", query);
    });
}

/**
 * Formulario de inicio de sesion
 */
function initLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const feedback = document.getElementById("loginFeedback");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const clave = document.getElementById("clave").value;

        console.log("Usuario:", usuario);
        console.log("Clave:", clave);

        if (feedback) {
            feedback.hidden = false;
        }
    });
}

/**
 * Formulario de registro
 * Valida cada campo con expresiones regulares Y si todo es valido,
 * muestra los datos ingresados a traves de un alert.
 */
function initSignupForm() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    const patrones = {
        nombres: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
        apellidos: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/,
        email: /^[\w.+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/,
        telefono: /^\d{7,10}$/,
    };

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const camposTexto = {
            nombres: document.getElementById("nombres"),
            apellidos: document.getElementById("apellidos"),
            email: document.getElementById("email"),
            telefono: document.getElementById("telefono"),
        };
        const estrato = document.getElementById("estrato");
        const fechaNacimiento = document.getElementById("fechaNacimiento");
        const grupoSanguineo = document.getElementById("grupoSanguineo");
        const generoError = document.getElementById("generoError");

        let esValido = true;

        Object.entries(camposTexto).forEach(([nombreCampo, input]) => {
            const coincide = patrones[nombreCampo].test(input.value.trim());
            input.classList.toggle("is-invalid", !coincide);
            input.classList.toggle("is-valid", coincide);
            esValido = esValido && coincide;
        });

        const estratoValido = estrato.value >= 1 && estrato.value <= 6;
        estrato.classList.toggle("is-invalid", !estratoValido);
        estrato.classList.toggle("is-valid", estratoValido);
        esValido = esValido && estratoValido;

        const fechaValida = Boolean(fechaNacimiento.value);
        fechaNacimiento.classList.toggle("is-invalid", !fechaValida);
        fechaNacimiento.classList.toggle("is-valid", fechaValida);
        esValido = esValido && fechaValida;

        const grupoValido = Boolean(grupoSanguineo.value);
        grupoSanguineo.classList.toggle("is-invalid", !grupoValido);
        grupoSanguineo.classList.toggle("is-valid", grupoValido);
        esValido = esValido && grupoValido;

        const generoSeleccionado = signupForm.querySelector('input[name="genero"]:checked');
        generoError.hidden = Boolean(generoSeleccionado);
        esValido = esValido && Boolean(generoSeleccionado);

        if (!esValido) return;

        const actividades = Array.from(
            signupForm.querySelectorAll('input[name="actividades"]:checked')
        ).map((checkbox) => checkbox.value);

        const resumen = [
            `Nombres: ${camposTexto.nombres.value}`,
            `Apellidos: ${camposTexto.apellidos.value}`,
            `Email: ${camposTexto.email.value}`,
            `Telefono: ${camposTexto.telefono.value}`,
            `Estrato: ${estrato.value}`,
            `Fecha de nacimiento: ${fechaNacimiento.value}`,
            `Grupo sanguineo: ${grupoSanguineo.value}`,
            `Genero: ${generoSeleccionado.value}`,
            `Actividades favoritas: ${actividades.join(", ") || "Ninguna"}`,
        ].join("\n");

        alert(resumen);

        signupForm.reset();
        signupForm
            .querySelectorAll(".is-valid")
            .forEach((input) => input.classList.remove("is-valid"));
    });
}

/**
 * Menu About: cambia de seccion
 * y controla los botones de tamano/color de letra de cada
 * seccion de texto.
 */
function initAboutPage() {
    const secciones = document.querySelectorAll(".about-section");
    if (secciones.length === 0) return;

    function mostrarSeccionActual() {
        const destino = window.location.hash.replace("#", "") || "mision";
        secciones.forEach((seccion) => {
            seccion.classList.toggle("d-none", seccion.id !== destino);
        });
    }

    window.addEventListener("hashchange", mostrarSeccionActual);
    mostrarSeccionActual();

    const tamanosLetra = ["1rem", "1.15rem", "1.3rem", "1.5rem"];
    const coloresLetra = ["#212529", "#0d6efd", "#198754", "#dc3545", "#6f42c1"];

    function ciclarEstilo(selectorBoton, valores, aplicarEstilo) {
        document.querySelectorAll(selectorBoton).forEach((boton) => {
            let indice = 0;
            boton.addEventListener("click", () => {
                indice = (indice + 1) % valores.length;
                const texto = boton.closest(".about-section").querySelector(".texto-editable");
                aplicarEstilo(texto, valores[indice]);
            });
        });
    }

    ciclarEstilo(".btn-tamano-letra", tamanosLetra, (texto, valor) => {
        texto.style.fontSize = valor;
    });

    ciclarEstilo(".btn-color-letra", coloresLetra, (texto, valor) => {
        texto.style.color = valor;
    });
}
