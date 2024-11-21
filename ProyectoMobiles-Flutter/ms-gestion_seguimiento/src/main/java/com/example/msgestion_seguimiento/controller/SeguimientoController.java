package com.example.msgestion_seguimiento.controller;

import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.example.msgestion_seguimiento.service.SeguimientoService;
import com.example.msgestion_seguimiento.utils.PdfUpload;
import com.example.msgestion_seguimiento.utils.PdfUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
//import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
// import org.springframework.web.multipart.MultipartFile;
// import java.nio.file.Files;
// import java.nio.file.Paths;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/seguimiento")
public class SeguimientoController {
    @Autowired
    private SeguimientoService seguimientoService;

    @GetMapping
    ResponseEntity<List<Seguimiento>> lista() {
        return ResponseEntity.ok(seguimientoService.lista());
    }

    @PostMapping
    ResponseEntity<Seguimiento> guardar(@RequestBody Seguimiento seguimiento) {
        return ResponseEntity.ok(seguimientoService.guardar((seguimiento)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Seguimiento> buscarPorId(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(seguimientoService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Seguimiento> actualizar(@RequestBody Seguimiento seguimiento) {
        return ResponseEntity.ok(seguimientoService.actualizar((seguimiento)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Seguimiento>> eleminar(@PathVariable(required = true) Integer id) {
        seguimientoService.eleminar(id);
        return ResponseEntity.ok(seguimientoService.lista());

    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportarPdf() throws IOException {
        List<Seguimiento> seguimientos = seguimientoService.lista();
        ByteArrayOutputStream pdfStream = PdfUtils.generatePdfReport(seguimientos); // ahora se pasa la lista

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "Informe_De_Seguimientos.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfStream.toByteArray());
    }

    // @PostMapping("/{id}/upload")
    // public ResponseEntity<byte[]> subirArchivo(@PathVariable Integer id,
    // @RequestParam("archivo") MultipartFile archivo) {
    // try {
    // // Llama al servicio para subir el archivo
    // seguimientoService.subirArchivo(id, archivo);

    // // Ahora vamos a devolver el archivo como respuesta
    // String archivoNombre = "seguimiento_" + id + "_" +
    // archivo.getOriginalFilename();
    // byte[] archivoBytes = Files.readAllBytes(Paths.get("uploads",
    // archivoNombre));

    // // Crear los encabezados HTTP para la respuesta
    // HttpHeaders headers = new HttpHeaders();
    // headers.setContentType(MediaType.APPLICATION_PDF); // Suponiendo que es un
    // PDF

    // // Retornamos el archivo en la respuesta HTTP
    // return ResponseEntity.ok()
    // .headers(headers)
    // .body(archivoBytes);

    // } catch (Exception e) {
    // return ResponseEntity.status(500).body(("Error al subir archivo: " +
    // e.getMessage()).getBytes());
    // }
    // }
    String currentDirectory = System.getProperty("user.dir");
    private final String UPLOAD_DIRECTORY = "D:/Bolsa-Laboral/ms-gestion_seguimiento/uploads/seguimientos/";

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Imprimir ID recibido y nombre original del archivo
            System.out.println("ID recibido: " + id);
            System.out.println("Nombre del archivo recibido: " + file.getOriginalFilename());

            // Crear un nombre único para el archivo basado en el ID
            String fileName = "seguimiento_" + id + ".pdf"; // Cambiar el nombre al nuevo formato
            System.out.println("Nombre del archivo a guardar: " + fileName);

            // Llamar al método PdfUpload para guardar el archivo con el nuevo nombre
            String filePath = PdfUpload.saveUploadedPdf(file, UPLOAD_DIRECTORY, fileName);
            System.out.println("Archivo guardado en: " + filePath);

            // Retornar respuesta exitosa con la ruta del archivo guardado
            return ResponseEntity.ok("Archivo subido exitosamente: " + filePath);
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("Error al guardar el archivo: " + e.getMessage());
            e.printStackTrace(); // Imprimir traza de error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el archivo.");
        }
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<?> viewPdf(@PathVariable Long id) {
        try {
            // Construir el nombre del archivo PDF basado en el ID
            String fileName = "seguimiento_" + id + ".pdf";
            File pdfFile = new File(UPLOAD_DIRECTORY, fileName);

            // Validar si el archivo existe
            if (!pdfFile.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("El archivo solicitado no existe: " + fileName);
            }

            // Crear un InputStream para leer el archivo
            FileInputStream fis = new FileInputStream(pdfFile);

            // Configurar los encabezados de la respuesta para mostrar el PDF en el
            // navegador
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", fileName);

            // Retornar el archivo como InputStreamResource
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(pdfFile.length())
                    .body(new InputStreamResource(fis));

        } catch (FileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Archivo no encontrado: " + e.getMessage());
        }
    }

}