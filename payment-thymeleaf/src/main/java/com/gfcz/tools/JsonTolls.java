package com.gfcz.tools;

import java.io.IOException; 
import java.util.HashMap;
import java.util.Map;  

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gfcz.PaymentSerachBean;
import com.gfcz.shiro.entity.User; 
public class JsonTolls {

	
	
	private static JsonGenerator jsonGenerator = null;  
	 private static ObjectMapper objectMapper = null;  
	 private static User user = null;  
	  
//	 public static void writeEntity2Json() throws IOException {  
//	  // writeObject可以转换java对象，eg:JavaBean/Map/List/Array等  
//	  jsonGenerator.writeObject(user);  
//	  System.out.println("使用ObjectMapper-----------");  
//	  // writeValue具有和writeObject相同的功能  
//	  objectMapper.writeValue(System.out, user);  
//	 }  
//	  
//	 public static void writeList2Json() throws IOException {  
//	  List<User> userList = new ArrayList<User>();  
//	  userList.add(user);  
//	  User u = new User();
//	  u.setUsername("archie");  
//	  u.setPassword("123");  
//	  userList.add(u);  
//	  objectMapper.writeValue(System.out, userList);  
//	 }  
//	  
//	 public static void writeMap2Json() {  
//	  try {  
//	   Map<String, Object> map = new HashMap<String, Object>();  
//	   User u = new User();  
//	   u.setUsername("archie");  
//	   u.setPassword("123");   
//	   map.put("uname", u.getUsername());  
//	   map.put("upwd", u.getPassword());  
//	   System.out.println("jsonGenerator");  
//	   jsonGenerator.writeObject(map);  
//	   objectMapper.writeValue(System.out, map);  
//	  } catch (IOException e) {  
//	   e.printStackTrace();  
//	  }  
//	 }  
//	  
//	 public static void writeOthersJSON() {  
//	  try {  
//	   String[] arr = { "a", "b", "c" };  
//	   System.out.println("jsonGenerator");  
//	   String str = "hello world jackson!";  
//	   // byte  
//	   jsonGenerator.writeBinary(str.getBytes());  
//	   // boolean  
//	   jsonGenerator.writeBoolean(true);  
//	   // null  
//	   jsonGenerator.writeNull();  
//	   // float  
//	   jsonGenerator.writeNumber(2.2f);  
//	   // char  
//	   jsonGenerator.writeRaw("c");  
//	   // String  
//	   jsonGenerator.writeRaw(str, 5, 10);  
//	   // String  
//	   jsonGenerator.writeRawValue(str, 5, 5);  
//	   // String  
//	   jsonGenerator.writeString(str);  
//	//   jsonGenerator.writeTree(JsonNodeFactory.instance.POJONode(str));  
//	   System.out.println();  
//	   // Object  
//	   jsonGenerator.writeStartObject();// {  
//	   jsonGenerator.writeObjectFieldStart("user");// user:  
//	   jsonGenerator.writeStringField("name", "jackson");// name:jackson  
//	   jsonGenerator.writeBooleanField("sex", true);// sex:true  
//	   jsonGenerator.writeNumberField("age", 22);// age:22  
//	   jsonGenerator.writeEndObject();  
//	   jsonGenerator.writeArrayFieldStart("infos");// infos:[  
//	   jsonGenerator.writeNumber(22);// 22  
//	   jsonGenerator.writeString("this is array");// this is array  
//	   jsonGenerator.writeEndArray();// ]  
//	   jsonGenerator.writeEndObject();// }  
//	   User u = new User();  
//	   // complex Object  
//	   jsonGenerator.writeStartObject();// {  
//	   jsonGenerator.writeObjectField("uid", u);// user:{bean}  
//	   jsonGenerator.writeObjectField("infos", arr);// infos:[array]  
//	   jsonGenerator.writeEndObject();// }  
//	  } catch (Exception e) {  
//	   e.printStackTrace();  
//	  }  
//	 }  
//	  
//	 /** 
//	  * JSON字符串转换为对象 
//	  */  
//	 public static void readJson2Entity() {  
//	  String json = "{\"uid\":5,\"uname\":\"tom\",\"number\":3.44,\"upwd\":\"123\"}";  
//
//	   try {
//		User acc = objectMapper.readValue(json, User.class);
//	} catch (JsonParseException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	} catch (JsonMappingException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	} catch (IOException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	}  
//	//   System.out.println(acc.getUid());  
//	   
//	 }  
//	  
//	 /** 
//	  * JSON转换为List对象 
//	  */  
//	 public static void readJson2List() {  
//	//  String json = "[{\"uid\":1,\"uname\":\"www\",\"number\":234,\"upwd\":\"456\"},"  
////	    + "{\"uid\":5,\"uname\":\"tom\",\"number\":3.44,\"upwd\":\"123\"}]";  
//		 String json =  "[{\"field\":\"organizationId\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"originIndex\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"moneySums\",\"op\":\"gt\",\"data\":\"12\"}]";
//		  
//	  try {  
//	   List<LinkedHashMap<String, Object>> list = objectMapper.readValue(  
//	     json, List.class);  
//	   System.out.println(list.size());  
//	   for (int i = 0; i < list.size(); i++) {  
//	    Map<String, Object> map = list.get(i);  
//	    Set<String> set = map.keySet();  
//	    for (Iterator<String> it = set.iterator(); it.hasNext();) {  
//	     String key = it.next();  
//	     System.out.println(key + ":" + map.get(key));  
//	    }  
//	   }  
//	  } catch (JsonParseException e) {  
//	   e.printStackTrace();  
//	  } catch (JsonMappingException e) {  
//	   e.printStackTrace();  
//	  } catch (IOException e) {  
//	   e.printStackTrace();  
//	  }  
//	 }  
	  
	 /** 
	  * JSON转换为数组对象 
	 * @param <T>
	  */  
	 public static <T> void readJson2Array(Class<T> clazz,String json) {  
	//  String json = "[{\"uid\":1,\"uname\":\"www\",\"number\":234,\"upwd\":\"456\"},"  
//	    + "{\"uid\":2,\"uname\":\"sdfsdf\",\"number\":4745,\"upwd\":\"23456\"}]";  
	//  
	  
//	  String json =  "[{\"field\":\"organizationId\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"originIndex\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"moneySums\",\"op\":\"gt\",\"data\":\"12\"}]";
	  try {  
		  PaymentSerachBean[] arr = objectMapper.readValue(json, PaymentSerachBean[].class);
	  
	  } catch (JsonParseException e) {  
	   e.printStackTrace();  
	  } catch (JsonMappingException e) {  
	   e.printStackTrace();  
	  } catch (IOException e) {  
	   e.printStackTrace();  
	  }  
	 }  
	  
	 /** 
	  * JSON转换为Map对象 
	  */  
	 public static Map<String, String> readJson2Map(String json) {  
	//  String json = "{\"success\":true,\"A\":{\"address\": \"address2\",\"name\":\"haha2\",\"id\":2,\"email\":\"email2\"},"+    
	//  "\"B\":{\"address\":\"address\",\"name\":\"haha\",\"id\":1,\"email\":\"email\"}}";  
	  
//	  String json="{\"groupOp\":\"AND\",\"rules\":[{\"field\":\"organizationId\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"originIndex\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"moneySums\",\"op\":\"gt\",\"data\":\"12\"}]}";
	  Map<String, String> maps=new HashMap();
	  try {  
		  maps = objectMapper.readValue(json, Map.class);  
	   
//	   String json2=maps.get("rules");
	   
	   
	   
	  } catch (JsonParseException e) {  
	   e.printStackTrace();  
	  } catch (JsonMappingException e) {  
	   e.printStackTrace();  
	  } catch (IOException e) {  
	   e.printStackTrace();  
	  } 
	  return maps;
	 }  
	
	
}
