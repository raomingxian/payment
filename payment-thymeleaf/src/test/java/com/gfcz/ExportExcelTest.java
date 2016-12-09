package com.gfcz;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gfcz.business.payment.web.dao.IPaymentDao;
import com.gfcz.business.payment.web.entity.BusinessPayment;
import com.gfcz.dto.BusinessPaymentDto;
import com.gfcz.dto.WebDto;
import com.gfcz.shiro.entity.User;
import com.gfcz.tools.ExcelUtil;

import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;


//@SpringBootTest
//@RunWith(SpringRunner.class)
public class ExportExcelTest {

//	@Autowired
//	private IPaymentDao iPaymentDao;
//    @Test
    public static void test() throws Exception {
    	
    	List<BusinessPaymentDto> list=new ArrayList<BusinessPaymentDto>();
    	BusinessPaymentDto businessPaymentDto=new BusinessPaymentDto();
    	businessPaymentDto.setMoneySums(11);
    	businessPaymentDto.setCaption("adfadf");
    	businessPaymentDto.setOrganizationId("businessPayment");
    	businessPaymentDto.setOriginIndex("businessPayment");
    	list.add(businessPaymentDto);
//		Set set=new HashSet();
//		set.add(97);
//		set.add(95);
//		set.add(71);
//		set.add(67);
//    	List<BusinessPayment> list =iPaymentDao.findAll(set);
		System.out.println(list.size());
        Map<String, String> map = new HashMap<String, String>();
        map.put("title", "预算指标");
        map.put("total", list.size()+" 条");
        map.put("date", getDate());

        

        ExcelUtil.getInstance().exportObj2ExcelByTemplate(map, "payment-template.xls", new FileOutputStream("D:/temp/"+UUID.randomUUID().toString()+"out.xls"),
                list, BusinessPaymentDto.class, true);
    }

    private static String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
        return sdf.format(new Date());
    }
    
    
    public static void main(String[] args) throws Exception {
    	
    	test();
    }  
}
