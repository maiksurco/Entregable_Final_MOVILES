import 'package:flutter/material.dart';
import 'package:lb_app/apis/estudiante_api.dart';
import 'package:lb_app/modelo/EstudianteModelo.dart';
import 'package:lb_app/theme/AppTheme.dart';
import 'package:lb_app/login/login_user.dart';
import 'package:lb_app/util/TokenUtil.dart';

class HomeDrawer extends StatefulWidget {
  const HomeDrawer({
    super.key,
    required this.screenIndex,
    required this.iconAnimationController,
    required this.callBackIndex,
  });

  final AnimationController iconAnimationController;
  final DrawerIndex screenIndex;
  final Function(DrawerIndex) callBackIndex;

  @override
  _HomeDrawerState createState() => _HomeDrawerState();
}

class _HomeDrawerState extends State<HomeDrawer> {
  List<DrawerList>? drawerList;
  String? estudianteNombre;
  String? estudianteApellido;
  String? estudianteApellidoM;
  bool isLoading = true; // Indicador de carga

  @override
  void initState() {
    setDrawerListArray();
    super.initState();
    _fetchEstudianteData(); // Llamada al método para cargar los datos del estudiante
  }

  // Método para obtener los datos del estudiante asociado al authUserId
  Future<void> _fetchEstudianteData() async {
    final api = EstudianteApi.create(); // Crear instancia de la API
    try {
      final estudiantes =
          await api.listarEstudiantes(); // Obtener todos los estudiantes
      print("Estudiantes recuperados: ");
      estudiantes.forEach((est) {
        print("Estudiante: ${est.nombre}, AuthUserId: ${est.authUserId}");
      });

      final authUserId =
          TokenUtil.authUserId; // Obtener el authUserId del token
      print("authUserId: $authUserId");

      // Asegurarnos de que authUserId sea un número entero
      final int? authUserIdInt = int.tryParse(authUserId.toString());
      if (authUserIdInt == null) {
        print("El authUserId no es válido.");
        return;
      }

      // Buscar al estudiante con el authUserId correspondiente
      final estudiante = estudiantes.firstWhere(
        (est) =>
            est.authUserId == authUserIdInt, // Comparación estricta con enteros
        orElse: () {
          print(
              "No se encontró un estudiante con el authUserId: $authUserIdInt");
          return EstudianteModelo(
              id: 0,
              nombre: 'Anonimo',
              apellidoPaterno: 'Anonimo',
              apellidoMaterno: '',
              dni: 0,
              carrera: '',
              universidad: '',
              habilidades: '',
              horasCompletadas: '',
              authUserId: 0,
              authUserDto: AuthUserDto(id: 0, userName: ''));
        },
      );

      if (estudiante.authUserId != 0) {
        final estudianteDetalles = await api.buscarEstudiante(estudiante
            .id); // Llamamos al endpoint para obtener los detalles completos
        setState(() {
          estudianteNombre = estudianteDetalles.nombre;
          estudianteApellido = estudianteDetalles.apellidoPaterno;
          estudianteApellidoM = estudianteDetalles.apellidoMaterno;
          isLoading = false;
        });
      } else {
        setState(() {
          estudianteNombre = 'Anonimo';
          estudianteApellido = 'Anonimo';
          estudianteApellidoM = 'Anonimo';
          isLoading = false;
        });
      }
    } catch (e) {
      print("Error al obtener los datos del estudiante: $e");
      setState(() {
        isLoading = false;
      });
    }
  }

  void setDrawerListArray() {
    drawerList = <DrawerList>[
      DrawerList(
        index: DrawerIndex.HOME,
        labelName: 'Principal',
        icon: Icon(Icons.home, color: Color(0xFF6B9071)), // Verde claro
      ),
      DrawerList(
        index: DrawerIndex.Invite,
        labelName: 'Estudiante',
        icon: Icon(Icons.group, color: Color(0xFF6B9071)), // Verde claro
      ),
      DrawerList(
        index: DrawerIndex.FeedBack,
        labelName: 'Postulaciones',
        icon: Icon(Icons.group, color: Color(0xFF6B9071)), // Verde claro
      ),
      DrawerList(
        index: DrawerIndex.Share,
        labelName: 'Ofertas',
        icon: Icon(Icons.group, color: Color(0xFF6B9071)), // Verde claro
      ),
      DrawerList(
        index: DrawerIndex.Testing,
        labelName: 'Seguimientos',
        icon: Icon(Icons.group, color: Color(0xFF6B9071)), // Verde claro
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Container(
            width: double.infinity,
            color: Color(0xFF375534), // Fondo del encabezado
            padding: const EdgeInsets.only(top: 40.0),
            child: Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  AnimatedBuilder(
                    animation: widget.iconAnimationController,
                    builder: (BuildContext context, Widget? child) {
                      return ScaleTransition(
                        scale: AlwaysStoppedAnimation<double>(
                            1.0 - (widget.iconAnimationController.value) * 0.2),
                        child: RotationTransition(
                          turns: AlwaysStoppedAnimation<double>(Tween<double>(
                                      begin: 0.0, end: 24.0)
                                  .animate(CurvedAnimation(
                                      parent: widget.iconAnimationController,
                                      curve: Curves.fastOutSlowIn))
                                  .value /
                              360),
                          child: Center(
                            child: CircleAvatar(
                              backgroundImage: AssetImage(
                                  'assets/imagen/configuraciones.png'),
                              radius: 40,
                              backgroundColor: Colors.transparent,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8, left: 4),
                    child: isLoading
                        ? CircularProgressIndicator(
                            color: Color(0xFF6B9071), // Verde claro
                          )
                        : Text(
                            "${estudianteNombre} ${estudianteApellido} ${estudianteApellidoM} (Administrador)",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 18,
                              color: Color(0xFFE3EED4), // Verde muy claro
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 4),
          Divider(height: 1, color: Color(0xFF6B9071)), // Verde claro
          Expanded(
            child: ListView.builder(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.all(0.0),
              itemCount: drawerList?.length,
              itemBuilder: (BuildContext context, int index) {
                return inkwell(drawerList![index]);
              },
            ),
          ),
          Divider(height: 1, color: Color(0xFF6B9071)), // Verde claro
          Column(
            children: <Widget>[
              ListTile(
                title: Text(
                  'Salir',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 16,
                    color: Color(0xFF0F2A1D), // Verde oscuro
                  ),
                  textAlign: TextAlign.left,
                ),
                trailing: Icon(Icons.power_settings_new,
                    color: Color(0xFF0F2A1D)), // Verde oscuro
                onTap: () {
                  onTapped();
                },
              ),
              SizedBox(height: MediaQuery.of(context).padding.bottom),
            ],
          ),
        ],
      ),
    );
  }

  void onTapped() {
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) {
        return LoginPage();
      }),
      ModalRoute.withName('/'),
    );
  }

  Widget inkwell(DrawerList listData) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        splashColor: Color(0xFF6B9071).withOpacity(0.1), // Verde claro
        highlightColor: Colors.transparent,
        onTap: () {
          navigationtoScreen(listData.index);
        },
        child: Stack(
          children: <Widget>[
            Container(
              padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
              child: Row(
                children: <Widget>[
                  Container(
                    width: 6.0,
                    height: 46.0,
                    color: widget.screenIndex == listData.index
                        ? Color(0xFF6B9071) // Verde claro
                        : Colors.transparent,
                  ),
                  const Padding(padding: EdgeInsets.all(4.0)),
                  listData.isAssetsImage
                      ? Container(
                          width: 24,
                          height: 24,
                          child: Image.asset(listData.imageName,
                              color: widget.screenIndex == listData.index
                                  ? Color(0xFF6B9071) // Verde claro
                                  : Color(0xFF0F2A1D)), // Verde oscuro
                        )
                      : Icon(listData.icon?.icon,
                          color: widget.screenIndex == listData.index
                              ? Color(0xFF6B9071) // Verde claro
                              : Color(0xFF0F2A1D)), // Verde oscuro
                  const Padding(padding: EdgeInsets.all(4.0)),
                  Text(
                    listData.labelName,
                    style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 16,
                      color: widget.screenIndex == listData.index
                          ? Color(0xFF6B9071) // Verde claro
                          : Color(0xFF0F2A1D), // Verde oscuro
                    ),
                    textAlign: TextAlign.left,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> navigationtoScreen(DrawerIndex indexScreen) async {
    widget.callBackIndex(indexScreen);
  }
}

enum DrawerIndex {
  HOME,
  FeedBack,
  Help,
  Share,
  About,
  Invite,
  Testing,
}

class DrawerList {
  DrawerList({
    this.isAssetsImage = false,
    this.labelName = '',
    this.icon,
    required this.index,
    this.imageName = '',
  });

  String labelName;
  Icon? icon;
  bool isAssetsImage;
  String imageName;
  DrawerIndex index;
}
