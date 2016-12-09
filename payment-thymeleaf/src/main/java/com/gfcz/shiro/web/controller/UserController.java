package com.gfcz.shiro.web.controller;

import com.gfcz.business.payment.web.dao.IPaymentDao;
import com.gfcz.business.payment.web.dao.UserIDao;
import com.gfcz.business.payment.web.entity.SysUser;
import com.gfcz.shiro.entity.User;
import com.gfcz.shiro.service.RoleService;
import com.gfcz.shiro.service.UserService;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@RestController
@RequestMapping("/user")
public class UserController {

	
	
    @Autowired
    private UserService userService;

 
    @Autowired
    private RoleService roleService;
    
	@Autowired
	private UserIDao userIDao;
    
    @Autowired  
    private HttpServletRequest request; 

    @RequiresPermissions("user:view")
    @RequestMapping(value = "/view",method = RequestMethod.GET)
    public Page<SysUser> list() {
    	int page=1;
    	if(request.getParameter("page")!=null&&!"".equals(request.getParameter("page"))){
    		page=Integer.valueOf(request.getParameter("page"));
    	}
    	
    	PageRequest pageRequest = buildPageRequest(page, 10);
    	
        return userIDao.findAll(pageRequest);
    }
    
    /**
     * 创建分页请求.
     */
    private PageRequest buildPageRequest(int pageNumber, int pagzSize) {
        Sort sort = null;
        
        sort = new Sort(Direction.DESC, "id");
            
        return new PageRequest(pageNumber - 1, pagzSize, sort);
    }
    
    @RequiresPermissions(value={"user:delete","user:update","user:create"},logical=Logical.OR) 
    @RequestMapping(value = "/update")
    public Boolean update(@RequestParam(value = "oper") String oper) {  //@RequestBody 获取实体类
//        model.addAttribute("userList", userService.findAll());
    	if("del".equals(oper)){
//    		String id=request.getParameter("id");
    		String[] ids=request.getParameter("id").split(",");
    		for(String id:ids ){
    			this.delete(Long.valueOf(id));
    		}
    		
    	}else if("add".equals(oper)){
    		User user=new User();
    		user.setOrganizationId(Long.valueOf(request.getParameter("organizationId"))); //request.getParameter("organizationId")
    		user.setPassword(request.getParameter("password1"));
    		user.setRoleIdsStr(request.getParameter("roleIds"));
    		user.setUsername(request.getParameter("username"));
    		user.setRealname(request.getParameter("realname"));
    		userService.createUser(user);
    	}else if("edit".equals(oper)){

    		User user=new User();
    		user.setOrganizationId(Long.valueOf(1)); //request.getParameter("organizationId")
    		user.setPassword(request.getParameter("password1"));
    		user.setRoleIdsStr(request.getParameter("roleIds"));
    		user.setUsername(request.getParameter("username"));
    		user.setRealname(request.getParameter("realname"));
    		user.setId(Long.valueOf(request.getParameter("id")));
    		userService.updateUser(user);
    	}else{
    		return false;
    	}
    	
        return true;
    }
      
    

    @RequiresPermissions("user:create")
    public String showCreateForm(Model model) {
        setCommonData(model);
        model.addAttribute("user", new User());
        model.addAttribute("op", "新增");
        return "user/edit";
    }

    @RequiresPermissions("user:create")
    public String create(User user, RedirectAttributes redirectAttributes) {
        userService.createUser(user);
        redirectAttributes.addFlashAttribute("msg", "新增成功");
        return "redirect:/user";
    }

//    @RequiresPermissions("user:update")
//    public String showUpdateForm(@RequestParam("ID") Long id, Model model) {
//        setCommonData(model);
//        model.addAttribute("user", userService.findOne(id));
//        model.addAttribute("op", "修改");
//        return "user/edit";
//    }
//
//    @RequiresPermissions("user:update")
//    public String update(User user, RedirectAttributes redirectAttributes) {
//        userService.updateUser(user);
//        redirectAttributes.addFlashAttribute("msg", "修改成功");
//        return "redirect:/user";
//    }



   
    public void delete( Long id) {
    	userService.deleteUser(id);
        
    }


    @RequiresPermissions("user:update")
    @RequestMapping(value = "/{id}/changePassword", method = RequestMethod.GET)
    public String showChangePasswordForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findOne(id));
        model.addAttribute("op", "修改密码");
        return "user/changePassword";
    }

    @RequiresPermissions("user:update")
    @RequestMapping(value = "/{id}/changePassword", method = RequestMethod.POST)
    public String changePassword(@PathVariable("id") Long id, String newPassword, RedirectAttributes redirectAttributes) {
        userService.changePassword(id, newPassword);
        redirectAttributes.addFlashAttribute("msg", "修改密码成功");
        return "redirect:/user";
    }
    

    @RequestMapping(value = "/chackusername/{username}", method = RequestMethod.POST)
    public Boolean chackUserName(@PathVariable("username") String username) {
        
        return userService.chackUserName(username);
    }

    private void setCommonData(Model model) {
        model.addAttribute("roleList", roleService.findAll());
    }
}
