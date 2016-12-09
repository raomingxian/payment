package com.gfcz;

import java.io.File;
import java.time.LocalDate;

public class FileTest {

	public static void main(String[] args) {
		LocalDate localDate=LocalDate.now();
    	int localYeas=localDate.getYear();
    	int localMonth=localDate.getMonthValue();
    	int localDay=localDate.getDayOfMonth();
    	
    	String uploadPath= "D:/temp/";
    	
    	File file =new File(uploadPath.replace("/", "\\"));
    	File file1 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas);
    	File file2 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas+"\\"+localMonth);
    	File file3 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas+"\\"+localMonth+"\\"+localDay);
    	
    	
    	//如果文件夹不存在则创建    
    	if  (!file .exists()  && !file .isDirectory())      
    	{       
    	    System.out.println("//不存在");  
    	    file .mkdir();    
    	} else   
    	{  
    	    System.out.println("//目录存在");  
    	}  
    	//如果文件夹不存在则创建    
    	if  (!file1.exists()  && !file1.isDirectory())      
    	{       
    	    System.out.println("//不存在");  
    	    file1.mkdir();    
    	} else   
    	{  
    	    System.out.println("//目录存在");  
    	}
    	
    	//如果文件夹不存在则创建    
    	if  (!file2 .exists()  && !file2.isDirectory())      
    	{       
    	    System.out.println("//不存在");  
    	    file2.mkdir();    
    	} else   
    	{  
    	    System.out.println("//目录存在");  
    	} 
    	//如果文件夹不存在则创建    
    	if  (!file3.exists()  && !file3.isDirectory())      
    	{       
    	    System.out.println("//不存在");  
    	    file3.mkdir();    
    	} else   
    	{  
    	    System.out.println("//目录存在");  
    	} 
    	
    	
    	
	}

}
