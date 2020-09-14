/*
 * @Author: your name
 * @Date: 2020-09-12 15:45:43
 * @LastEditTime: 2020-09-12 18:21:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings 
 * @FilePath: \JDR_Blog\docs\Front_End\Flutter\demo1.dart
 */
void main() { 
  String str = "this is String";
  String str1 = "thisfsdf";
  String str2 = '''hello 
  world''';
  print(str);
  print(str1);
  
  int a=123;
  double b=12.123;
  var person = {
    "name":"Amos",
    "age": 12
  };
  print(a);
  print(person["name"]);
  // is 用作类型判断
  if( str is String) {
    print(true);
  } else {
    print(false);
  };
  bool flag=true;
  print(!flag);
  for(int i=0;i<=10;i++) {
    print(i);
  }
}