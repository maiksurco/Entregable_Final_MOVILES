import inquirer from 'inquirer'; // Usamos import para ESM
import { exec } from 'child_process';

// Función para iniciar un microservicio
function iniciarMicroservicio(ruta, comando) {
  exec(`start cmd /k "cd ${ruta} && ${comando}"`, (error) => {
    if (error) {
      console.error(`Error al iniciar: ${error.message}`);
      return;
    }
  });
}

// Función para mostrar el menú principal
async function mostrarMenuPrincipal() {
  console.clear(); // Limpiar la consola
  const respuesta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Seleccione una opción:',
      choices: [
        'Iniciar Microservicios',
        'Detener Microservicios',
        'Iniciar Frontend', // Nueva opción para iniciar el frontend
        'Salir'
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case 'Iniciar Microservicios':
      await iniciarMicroserviciosMenu();
      break;
    case 'Detener Microservicios':
      detenerMicroservicios();
      break;
    case 'Iniciar Frontend': // Caso para iniciar el frontend
      iniciarFrontend();
      await mostrarMenuPrincipal(); // Volver al menú principal
      break;
    case 'Salir':
      console.log('Saliendo del programa...');
      process.exit();
      break;
  }
}

// Función para iniciar microservicios específicos
async function iniciarMicroserviciosMenu() {
  console.clear(); // Limpiar la consola
  const microservicios = [
    'ms-config-server',
    'ms-registry-server',
    'ms-gateway-server',
    'ms-auth',
    'ms-gestion_estudiantes',
    'ms-gestion_empresa',
    'ms-gestion_notificacion',
    'ms-gestion_oferta',
    'ms-gestion_postulacion',
    'ms-gestion_seguimiento',
    new inquirer.Separator(),
    'Regresar al menú anterior'
  ];

  const respuesta = await inquirer.prompt([
    {
      type: 'list',
      name: 'microservicio',
      message: 'Seleccione el microservicio que desea iniciar:',
      choices: microservicios
    }
  ]);

  switch (respuesta.microservicio) {
    case 'ms-config-server':
    case 'ms-registry-server':
    case 'ms-gateway-server':
    case 'ms-auth':
    case 'ms-gestion_estudiantes':
    case 'ms-gestion_empresa':
    case 'ms-gestion_notificacion':
    case 'ms-gestion_oferta':
    case 'ms-gestion_postulacion':
    case 'ms-gestion_seguimiento':
      console.log(`Iniciando ${respuesta.microservicio}...`);
      iniciarMicroservicio(`D:\\Bolsa-Laboral\\${respuesta.microservicio}`, 'mvn spring-boot:run');
      break;
    case 'Regresar al menú anterior':
      return mostrarMenuPrincipal(); // Regresar al menú principal
    default:
      console.log('Opción no válida.'); // Manejo de error si es necesario
  }

  await mostrarMenuPrincipal(); // Volver al menú principal
}

// Función para iniciar el frontend
function iniciarFrontend() {
  console.log('Iniciando el frontend...');
  iniciarMicroservicio(`D:\\Bolsa-Laboral\\lb-frontend`, 'npm run dev'); // Ruta actualizada a la carpeta "lb-frontend"
}

// Función para detener todos los microservicios
function detenerMicroservicios() {
  console.clear(); // Limpiar la consola
  console.log('Deteniendo todos los microservicios...');
  exec('taskkill /F /IM java.exe', (error) => {
    if (error) {
      console.error(`Error al detener: ${error.message}`);
      return;
    }
    console.log('Todos los microservicios han sido detenidos.');
  });
  mostrarMenuPrincipal(); // Volver al menú principal
}

// Llamar al menú principal al iniciar el programa
mostrarMenuPrincipal();