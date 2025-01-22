// src/web/main.js (frontend)

$(document).ready(function () {

    const backendURL = "https://vercel-web-backend.vercel.app/api"; // Reemplaza con la URL real de tu backend
  
    $("#botonMostrarAlumnos").click(function () {
      $.ajax({
        url: `${backendURL}/alumnos`,
        method: "GET",
        success: function (alumnos) {
          $("#listaAlumnos").empty();
          alumnos.forEach(function (alumno) {
            $("#listaAlumnos").append(
              "<li>ID: " +
                alumno.id +
                ", Nombre: " +
                alumno.nombre +
                ", Apellido: " +
                alumno.apellido +
                ", Teléfono: " +
                alumno.telefono +
                "</li>"
            );
          });
        },
        error: function () {
          alert("Error al obtener los alumnos");
        },
      });
    });
  
    $("#formularioAddAlumnos").submit(function (event) {
      event.preventDefault();
      const alumnoData = {
        id: $("#alumnoId").val(),
        nombre: $("#nombreAlumno").val(),
        apellido: $("#apellidoAlumno").val(),
        telefono: $("#telefonoAlumno").val(),
      };
      $.ajax({
        url: `${backendURL}/agregarAlumno`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(alumnoData),
        success: function (nuevoAlumno) {
          $("#addMensajeAlumno").text("Alumno agregado correctamente");
          $("#formularioAddAlumnos")[0].reset();
        },
        error: function (response) {
          $("#addMensajeAlumno").text(
            "Error al agregar alumno: " + response.responseJSON.message
          );
        },
      });
    });
  
    $("#botonBuscarAlumno").click(function () {
      const alumnoId = $("#idAlumnoBuscado").val();
      if (!alumnoId) {
        $("#resultado").text("Ingrese un ID de alumno");
        return;
      }
      $.ajax({
        url: `${backendURL}/alumnos/${alumnoId}`,
        method: "GET",
        success: function (alumno) {
          $("#resultado").html(
            "<p>ID: " +
              alumno.id +
              "</p><p>Nombre: " +
              alumno.nombre +
              "</p><p>Apellido: " +
              alumno.apellido +
              "</p><p>Teléfono: " +
              alumno.telefono +
              "</p>"
          );
        },
        error: function (response) {
          $("#resultado").text("Alumno no encontrado");
        },
      });
    });
  });
  