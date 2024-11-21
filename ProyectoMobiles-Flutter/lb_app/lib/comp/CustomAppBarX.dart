//import 'package:asistencia_appn/drawer/drawer_user_controller.dart';
import 'package:flutter/material.dart';
import 'package:lb_app/theme/AppTheme.dart';

class CustomAppBarX extends StatefulWidget implements PreferredSizeWidget {
  CustomAppBarX({super.key, required this.accionx})
      : preferredSize = Size.fromHeight(50.0);

  Function accionx;

  @override
  final Size preferredSize;
  @override
  _CustomAppBarState createState() => _CustomAppBarState(accionx);
}

class _CustomAppBarState extends State<CustomAppBarX> {
  _CustomAppBarState(this.accionx);
  Function accionx;
  @override
  Widget build(BuildContext context) {
    int coloS = 0;
    return AppBar(
      title: Center(
        child: AppTheme.useMaterial3
            ? const Text(
                "BOLSA LABORAL",
                style: TextStyle(color: Color(0xFFE3EED4)), // Color del título
              )
            : const Text(
                "Bolsa Laboral",
                style: TextStyle(color: Color(0xFFE3EED4)), // Color del título
              ),
      ),
      backgroundColor: Color(0xFF375534), // Fondo del AppBar
      actions: [
        IconButton(
          icon: AppTheme.useLightMode
              ? const Icon(Icons.wb_sunny_outlined)
              : const Icon(Icons.wb_sunny),
          color: Color(0xFFE3EED4), // Color del ícono
          onPressed: () {
            setState(() {
              AppTheme.useLightMode = !AppTheme.useLightMode;
              if (AppTheme.useLightMode == true) {
                AppTheme.themeDataLight = ThemeData(
                  useMaterial3: AppTheme.useMaterial3,
                  colorScheme:
                      AppTheme.colorOptionsShemeL[AppTheme.colorSelected],
                );
                AppTheme.colorMenu = Color(0xFF6B9071);
                if (AppTheme.useMaterial3 == false) {
                  AppTheme.colorMenu = Color(0xFFE3EED4);
                }
              } else {
                AppTheme.themeDataDark = ThemeData(
                  useMaterial3: AppTheme.useMaterial3,
                  colorScheme:
                      AppTheme.colorOptionsShemeD[AppTheme.colorSelected],
                );
                AppTheme.colorMenu = Color(0xFFE3EED4);
              }
              accionx();
            });
          },
          tooltip: "Toggle brightness",
        ),
        PopupMenuButton(
          icon: const Icon(Icons.more_vert,
              color: Color(0xFFE3EED4)), // Color del ícono
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          itemBuilder: (context) {
            return List.generate(AppTheme.colorTextLD.length, (index) {
              return PopupMenuItem(
                value: index,
                child: Wrap(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Icon(
                        index == AppTheme.colorOptionsLD
                            ? Icons.color_lens
                            : Icons.color_lens_outlined,
                        color: AppTheme.colorOptionsLD[index],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20),
                      child: Text(AppTheme.colorTextLD[index]),
                    ),
                  ],
                ),
                onTap: () {
                  coloS = index;
                  AppTheme.colorSelected = coloS;
                },
              );
            });
          },
          onSelected: (valor) {
            setState(() {
              if (AppTheme.useLightMode == true) {
                AppTheme.themeDataLight = ThemeData(
                  useMaterial3: AppTheme.useMaterial3,
                  colorScheme:
                      AppTheme.colorOptionsShemeL[AppTheme.colorSelected],
                );
                AppTheme.colorMenu = Color(0xFF6B9071);
                if (AppTheme.useMaterial3 == false) {
                  AppTheme.colorMenu = Color(0xFFE3EED4);
                }
              } else {
                AppTheme.themeDataDark = ThemeData(
                  useMaterial3: AppTheme.useMaterial3,
                  colorScheme:
                      AppTheme.colorOptionsShemeD[AppTheme.colorSelected],
                );
                AppTheme.colorMenu = Color(0xFFE3EED4);
              }
            });
            accionx();
          },
        ),
      ],
    );
  }
}
