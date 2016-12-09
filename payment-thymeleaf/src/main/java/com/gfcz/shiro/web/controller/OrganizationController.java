package com.gfcz.shiro.web.controller;



import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gfcz.business.payment.web.dao.DepartmentIDao;
import com.gfcz.business.payment.web.dao.OrganizationIDao;
import com.gfcz.business.payment.web.dao.UserIDao;
import com.gfcz.business.payment.web.entity.BusinessPayment;
import com.gfcz.business.payment.web.entity.Department;
import com.gfcz.business.payment.web.entity.Organization;
import com.gfcz.business.payment.web.entity.SysUser;


@RestController
@RequestMapping("/business/organization")
public class OrganizationController {


	@Autowired
	private DepartmentIDao departmentIDao;
	@Autowired
	private OrganizationIDao organizationIDao;
	@Autowired
	private UserIDao userIDao;
	
    @Autowired  
    private HttpServletRequest request; 
	
//    /**
//     * 查询股室
//     * @return
//     */
//    @RequiresPermissions("sysmanage:view")
//    @RequestMapping(value = "/view")
//    public Page<Department> departmentView() {
//    	int page=1;
//    	if(request.getParameter("page")!=null&&!"".equals(request.getParameter("page"))){
//    		page=Integer.valueOf(request.getParameter("page"));
//    	}
//    	
//    	PageRequest pageRequest = buildPageRequest(page, 10);
//    	
//        return departmentIDao.findAll(pageRequest);
//    }
    
    /**
     * 查询股室
     * ,method = RequestMethod.POST
     * @return 
     */
//    @RequiresPermissions("sysmanage:view")
    @RequestMapping(value = "/departmentlist")
    public List<Department> departmentList() {
        return departmentIDao.findAll();
    }
    

    
    
//    @RequestMapping(value = "/organizationlist/{organizationtypeid}")
//    public List<Organization> organizationList(@PathVariable("organizationtypeid") int organizationtypeid) {
//        return organizationIDao.findBySysOrganizationType(organizationITypeDao.findOne(organizationtypeid));
//    }
    
    
    
    
    
    @RequestMapping(value = "/organizationlist")
    public List<Organization> departmentOrganizationList() {
    	
     	Subject subject = SecurityUtils.getSubject();
 		String userName = subject.getPrincipal().toString();
    	
 		SysUser sysuser=userIDao.findByUsername(userName);
 		
 		return organizationIDao.findBySysDepartment(sysuser.getSysDepartment());
 		
        
    }
    
    
     
    
    
    
    
    /**
     * 查询单位
     * @return
     */
    @RequestMapping(value = "/view")
    public Page<Organization> findOrganizationByDepartment(){
    	int page=1;
    	if(request.getParameter("page")!=null&&!"".equals(request.getParameter("page"))){
    		page=Integer.valueOf(request.getParameter("page"));
    	}
    	
    	
    	PageRequest pageRequest = buildPageRequest(page, 10);
    	return organizationIDao.findAll(pageRequest);
    	
    }
    
    
    
    
    
    /**
     * 
     * @param oper 操作类型 del：删除  add：增加  edit：编辑
     * @return
     */
     @RequiresPermissions(value={"organization:create","organization:update","organization:delete"},logical=Logical.OR) 
     @RequestMapping(value = "/update")
     public String update(@RequestParam(value = "oper") String oper) {  //@RequestBody 获取实体类
     	
     	Subject subject = SecurityUtils.getSubject();
 		String userName = subject.getPrincipal().toString();
     	
     	if("del".equals(oper)){
     		String[] ids=request.getParameter("id").split(",");
     		for(String id:ids ){
     			organizationIDao.delete(Integer.parseInt(id));
     		}
     		
     	}else if("add".equals(oper)){
     		
     		Organization organization=new Organization();
     		organization.setSysDepartment(departmentIDao.findOne(Integer.valueOf(request.getParameter("sysDepartment.departmentName"))));
     		organization.setOrganizationName(request.getParameter("organizationName"));
     		organizationIDao.save(organization);
     	}else if("edit".equals(oper)){
     		Organization organization=organizationIDao.findOne(Integer.valueOf(request.getParameter("id")));
     		organization.setSysDepartment(departmentIDao.findOne(Integer.valueOf(request.getParameter("sysDepartment.departmentName"))));
     		organization.setOrganizationName(request.getParameter("organizationName"));
     		organizationIDao.save(organization);
     		
     		
     	}else{
     		return "false";
     	}
     	
         return "添加成功";
     }
    

    
    /**
     * 创建分页请求.
     */
    private PageRequest buildPageRequest(int pageNumber, int pagzSize) {
        Sort sort = null;
        
        sort = new Sort(Direction.ASC, "id");
            
        return new PageRequest(pageNumber - 1, pagzSize, sort);
    }
    
}
