import 'package:lb_app/theme/AppTheme.dart';
import 'package:lb_app/drawuser/drawuser_controller.dart';
import 'package:lb_app/drawuser/user_drawuser.dart';
import 'package:lb_app/ui/estudiante/estudiante_main.dart';
import 'package:lb_app/ui/postulacion/postulacion_main.dart';
import 'package:lb_app/ui/help_screen.dart';
import 'package:flutter/material.dart';

class NavigationUserScreen extends StatefulWidget {
  @override
  _NavigationUserScreenState createState() => _NavigationUserScreenState();
}

class _NavigationUserScreenState extends State<NavigationUserScreen> {
  Widget? screenView;
  DrawerIndex? drawerIndex;

  @override
  void initState() {
    drawerIndex = DrawerIndex.HOME;
    screenView = HelpScreen();
    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    return Container(
      //color: AppTheme.themeData.primaryColor,
      child: SafeArea(
        top: false,
        bottom: false,
        child: Scaffold(
          backgroundColor: AppTheme.themeData.primaryColor,
          //appBar: CustomAppBar(accionx: accion as Function),
          body: DrawuserController(
            screenIndex: drawerIndex!!,
            drawerWidth: MediaQuery.of(context).size.width * 0.75,
            onDrawerCall: (DrawerIndex drawerIndexdata) {
              changeIndex(drawerIndexdata);
              //callback from drawer for replace screen as user need with passing DrawerIndex(Enum index)
            },
            screenView: screenView!!,
            drawerIsOpen: (bool ) {  },
            //we replace screen view as we need on navigate starting screens like MyHomePage, HelpScreen, FeedbackScreen, etc...
          ),
        ),
      ),
    );
  }

  void changeIndex(DrawerIndex drawerIndexdata) {
    if (drawerIndex != drawerIndexdata) {
      drawerIndex = drawerIndexdata;
      if (drawerIndex == DrawerIndex.HOME) {
        setState(() {
          screenView = HelpScreen(); //Principal
        });
      } else if (drawerIndex == DrawerIndex.Invite) {
        setState(() {
          screenView = EstudianteMain();  //Estudiante
        });
      } else if (drawerIndex == DrawerIndex.FeedBack) {
        setState(() {
          screenView = PostulacionMain();  //Postulacion
        });
      } else {
        //do in your way......
      }
    }
  }
}