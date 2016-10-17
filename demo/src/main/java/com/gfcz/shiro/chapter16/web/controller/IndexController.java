package com.gfcz.shiro.chapter16.web.controller;

import com.gfcz.shiro.chapter16.entity.Resource;
import com.gfcz.shiro.chapter16.entity.User;
import com.gfcz.shiro.chapter16.service.ResourceService;
import com.gfcz.shiro.chapter16.service.UserService;
import com.gfcz.shiro.chapter16.web.bind.annotation.CurrentUser;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-2-14
 * <p>Version: 1.0
 */
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

    @RequestMapping("/tables")
    public String welcome() {
        return "tables";
    }


}
