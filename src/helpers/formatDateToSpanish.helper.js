const formatDateToSpanish = (fecha) => {
    const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];
    const dias_semana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];
    return (
        dias_semana[fecha.getDay()] +
        ", " +
        fecha.getDate() +
        " de " +
        meses[fecha.getMonth()] +
        " de " +
        fecha.getUTCFullYear()
    );
};

module.exports = { formatDateToSpanish };
