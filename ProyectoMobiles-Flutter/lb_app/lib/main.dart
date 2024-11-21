import 'package:flutter/material.dart';
import 'package:lb_app/login/login_user.dart';
import 'package:lb_app/theme/AppTheme.dart';

void main() {
  runApp( MyApp());
}

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title:"Bolsa Laboral",
      theme: AppTheme.themeData,
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}