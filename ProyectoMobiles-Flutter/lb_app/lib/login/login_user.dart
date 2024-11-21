// login/login_user.dart
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:lb_app/apis/usuario_api.dart';
import 'package:lb_app/comp/Button.dart';
import 'package:lb_app/drawer/navigation_home_screen.dart';
import 'package:lb_app/drawuser/navegation_user_screen.dart';
import 'package:lb_app/modelo/UsuarioModelo.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:lb_app/util/TokenUtil.dart'; // Asegúrate de importar TokenUtil

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _controllerUser = TextEditingController();
  final TextEditingController _controllerPass = TextEditingController();
  bool passwordVisible = true;

  @override
  void initState() {
    super.initState();
    passwordVisible = true;
  }

  // Método de autenticación en /auth/login
  Future<RespUsuarioModelo?> authenticateUser(
      String userName, String password) async {
    final api = UsuarioApi.create();
    try {
      final usuario = UsuarioModelo(userName: userName, password: password);
      print("Datos enviados: ${usuario.toJson()}"); // Confirmar datos enviados
      final response = await api.login(usuario);
      print(
          "Datos recibidos: ${response.toJson()}"); // Confirmar datos recibidos
      return response;
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionTimeout) {
        print("Tiempo de espera excedido al intentar conectar.");
      } else if (e.type == DioExceptionType.receiveTimeout) {
        print("Tiempo de espera excedido al recibir la respuesta.");
      } else {
        print("Error de red en la autenticación: ${e.message}");
      }
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Color(0xFFE3EED4),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                // Cambié la imagen y añadí un texto adicional
                Image.asset("assets/imagen/Logo_LB.png", height: 180.0),
                SizedBox(height: 20),
                Text(
                  "Bolsa Laboral", // Texto agregado para la aplicación
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF0F2A1D),
                  ),
                ),
                SizedBox(height: 20),
                _buildForm(),
                SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Form _buildForm() {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          children: <Widget>[
            TextFormField(
              controller: _controllerUser,
              textInputAction: TextInputAction.done,
              decoration: InputDecoration(
                border: UnderlineInputBorder(),
                hintText: "Usuario",
                labelText: "Usuario",
                helperText: "Introduzca su usuario",
                helperStyle:
                    TextStyle(color: Color(0xFF375534)),
              ),
              validator: (value) =>
                  value!.isEmpty ? 'Ingrese su nombre de usuario' : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: _controllerPass,
              obscureText: passwordVisible,
              textInputAction: TextInputAction.done,
              decoration: InputDecoration(
                border: UnderlineInputBorder(),
                hintText: "Contraseña",
                labelText: "Contraseña",
                helperText: "Introduzca su contraseña",
                helperStyle:
                    TextStyle(color: Color(0xFF375534)),
                suffixIcon: IconButton(
                  icon: Icon(passwordVisible
                      ? Icons.visibility
                      : Icons.visibility_off),
                      color: Color(0xFF6B9071),
                  onPressed: () {
                    setState(() {
                      passwordVisible = !passwordVisible;
                    });
                  },
                ),
              ),
              validator: (value) =>
                  value!.isEmpty ? 'Ingrese su contraseña' : null,
            ),
            SizedBox(height: 24),
            Button(
              label: 'Ingresar',
              onTap: () async {
                if (_formKey.currentState!.validate()) {
                  final loginResponse = await authenticateUser(
                    _controllerUser.text,
                    _controllerPass.text,
                  );

                  if (loginResponse != null) {
                    final prefs = await SharedPreferences.getInstance();
                    String token = "Bearer ${loginResponse.token}";
                    prefs.setString("token", token);

                    // Guardar el authUserId en TokenUtil
                    TokenUtil.authUserId = loginResponse.authUserId.toString();

                    // Redirigir según el rol
                    if (loginResponse.role == 'USER_ADMIN') {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (context) => NavigationHomeScreen(),
                        ),
                      );
                    } else if (loginResponse.role == 'USER_DEFAULT') {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (context) => NavigationUserScreen(),
                        ),
                      );
                    } else {
                      // Si el rol no coincide con los esperados, mostramos un error
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            "Acceso denegado: rol incorrecto."),
                        ),

                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Error en la autenticación.")),
                    );
                  }
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
