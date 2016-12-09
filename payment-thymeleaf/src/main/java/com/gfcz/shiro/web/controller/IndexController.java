package com.gfcz.shiro.web.controller;

import com.gfcz.shiro.entity.Resource;
import com.gfcz.shiro.entity.User;
import com.gfcz.shiro.service.ResourceService;
import com.gfcz.shiro.service.UserService;
import com.gfcz.shiro.web.bind.annotation.CurrentUser;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;


@Controller
public class IndexController {

    @Autowired
    private ResourceService resourceService;
    @Autowired
    private UserService userService;

    @RequestMapping(value={"/","/index"})
    public String index( Model model) {
    	Subject currentUser = SecurityUtils.getSubject();
    	String username = (String)currentUser.getPrincipal();
    	Set<String> permissions = userService.findPermissions(username);
        List<Resource> menus = resourceService.findMenus(permissions);
        model.addAttribute("menus", menus);
        return "index";
    }

    @RequestMapping("/business/payment")
    @RequiresPermissions("payment:view")
    public String welcome() {
        return "payment";
    }
    
   
    @RequestMapping("/business/paymentcheck")
    public String paymentcheck() {
        return "paymentcheck";
    }
    @RequestMapping("/business/paymentcheckgk")
    public String paymentcheckgk() {
        return "paymentcheckgk";
    }
    @RequestMapping("/organization")
    public String organization() {
        return "organization";
    }
     
    @RequestMapping("/test")
    public String test() {
        return "test";
    }
    
    @RequestMapping("/user")
//    @RequiresPermissions("user:view")
    @RequiresPermissions(value={"user:delete","user:update","user:create"},logical=Logical.AND) 
    public String user() {
        return "user";
    }


}
