package com.example.msgestion_seguimiento.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class PdfUpload {

    // Método para guardar un archivo en un directorio específico
    public static String saveUploadedPdf(MultipartFile file, String uploadDirectory, String fileName)
            throws IOException {
        // Validar si el archivo es un PDF
        if (!file.getContentType().equalsIgnoreCase("application/pdf")) {
            throw new IllegalArgumentException("El archivo debe ser de tipo PDF.");
        }

        // Crear el directorio si no existe
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();  // Crear el directorio si no existe
        }

        // Generar la ruta completa donde se guardará el archivo
        File pdfFile = new File(directory, fileName);

        // Guardar el archivo en el directorio
        file.transferTo(pdfFile);  // Transferir el archivo al directorio

        // Retornar la ruta absoluta del archivo
        return pdfFile.getAbsolutePath();
    }
}