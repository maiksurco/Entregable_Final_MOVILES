package com.example.msgestion_seguimiento.utils;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.example.msgestion_seguimiento.dto.EstudianteDto;
import com.example.msgestion_seguimiento.dto.OfertaDto;
import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public class PdfUtils {

    // Método principal para generar el PDF
    public static ByteArrayOutputStream generatePdfReport(List<Seguimiento> seguimientos) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        document.setMargins(30, 30, 40, 30);

        // Título y encabezado
        document.add(new Paragraph("Informe de Seguimiento de Bolsa Laboral")
                .setFont(PdfFontFactory.createFont())
                .setFontSize(24)
                .setTextAlignment(TextAlignment.CENTER)
                .setBold());

        document.add(new Paragraph("Fecha del Informe: " + LocalDate.now())
                .setFontSize(12)
                .setTextAlignment(TextAlignment.RIGHT));

        document.add(new Paragraph("\n"));

        // Introducción
        document.add(new Paragraph("Introducción")
                .setFontSize(16)
                .setBold());
        document.add(new Paragraph(
                "Este informe ha sido elaborado para proporcionar un seguimiento detallado de las postulaciones de los estudiantes a diversas ofertas laborales a través del sistema de Bolsa Laboral. El objetivo es ofrecer una visión "
                + "general del desempeño y progreso de los estudiantes, así como del estado actual de las ofertas y postulaciones.")
                .setFontSize(12)
                .setTextAlignment(TextAlignment.JUSTIFIED));
        
        document.add(new Paragraph("\n"));

        // Resumen General
        document.add(new Paragraph("Resumen General")
                .setFontSize(16)
                .setBold());
        document.add(new Paragraph(
                "El informe cubre el periodo reciente de seguimiento de postulaciones y evaluaciones de los estudiantes, incluyendo observaciones clave sobre el rendimiento, áreas de mejora y el ajuste de los estudiantes a los requisitos "
                + "de cada oferta laboral. A continuación, se detallan los principales hallazgos y observaciones sobre las postulaciones.")
                .setFontSize(12)
                .setTextAlignment(TextAlignment.JUSTIFIED));

        document.add(new Paragraph("\n"));

        // Datos de Postulaciones usando datos de la lista seguimientos
        document.add(new Paragraph("Detalles de las Postulaciones")
                .setFontSize(16)
                .setBold());

        // Tabla de detalles de seguimiento
        Table postulacionesTable = new Table(UnitValue.createPercentArray(new float[] { 2, 4, 4, 2 }))
                .useAllAvailableWidth();
        postulacionesTable.addHeaderCell(new Cell().add(new Paragraph("Evaluación").setBold()));
        postulacionesTable.addHeaderCell(new Cell().add(new Paragraph("Observación").setBold()));
        postulacionesTable.addHeaderCell(new Cell().add(new Paragraph("Nombre del Estudiante").setBold()));
        postulacionesTable.addHeaderCell(new Cell().add(new Paragraph("Título de la Oferta").setBold()));

        // Añadir filas dinámicas basadas en la lista de seguimientos
        for (Seguimiento seguimiento : seguimientos) {
            postulacionesTable.addCell(seguimiento.getEvaluacion() != null ? seguimiento.getEvaluacion() : "No Disponible");
            postulacionesTable.addCell(seguimiento.getObservacion() != null ? seguimiento.getObservacion() : "No Disponible");

            // Mostrar el nombre completo del estudiante
            EstudianteDto estudiante = seguimiento.getEstudianteDto();
            String estudianteNombre = (estudiante != null) ? estudiante.getNombre() + " " + estudiante.getApellidoPaterno() + " " + estudiante.getApellidoMaterno() : "No Disponible";
            postulacionesTable.addCell(estudianteNombre);

            // Mostrar el título de la oferta
            OfertaDto oferta = seguimiento.getOfertaDto();
            String ofertaTitulo = (oferta != null) ? oferta.getTitulo() : "No Disponible";
            postulacionesTable.addCell(ofertaTitulo);
        }

        document.add(postulacionesTable);

        // Conclusión
        document.add(new Paragraph("\nConclusión")
                .setFontSize(16)
                .setBold());
        document.add(new Paragraph(
                "Este informe destaca el esfuerzo continuo de los estudiantes en mejorar sus competencias y postular a oportunidades relevantes en el mercado laboral. "
                + "Se recomienda fortalecer la colaboración entre estudiantes y empresas para maximizar el impacto de las postulaciones, proporcionando una formación continua que se adapte a las necesidades del mercado.")
                .setFontSize(12)
                .setTextAlignment(TextAlignment.JUSTIFIED));

        // Cerrar el documento
        document.close();
        return outputStream;
    }
}