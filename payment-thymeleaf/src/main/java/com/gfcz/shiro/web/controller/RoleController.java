package com.gfcz.shiro.web.controller;

import com.gfcz.shiro.entity.Resource;
import com.gfcz.shiro.entity.Role;
import com.gfcz.shiro.service.ResourceService;
import com.gfcz.shiro.service.RoleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private ResourceService resourceService;

    @RequiresPermissions("role:view")
    @RequestMapping(method = RequestMethod.GET)
    public String list(Model model) {
    	Map<Long,String> map=new HashMap<Long,String>();
    	List<Role> roleList=roleService.findAll();
    	
       
        
        for(Role role:roleList){
        	StringBuilder s = new StringBuilder();
        	List<Long> resourceIds=role.getResourceIds();
            for(Long resourceId : resourceIds) {
                Resource resource = resourceService.findOne(resourceId);

                s.append(resource.getName());
                s.append(",");
            }
            if(s.length() > 0) {
                s.deleteCharAt(s.length() - 1);
            }
            map.put(role.getId(), s.toString());
        }
        
        
        model.addAttribute("roleList", roleList);
        model.addAttribute("resourcemap", map);


//        return s.toString();
        
        
        return "role/list";
    }

    @RequiresPermissions("role:create")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String showCreateForm(Model model) {
        setCommonData(model);
        model.addAttribute("role", new Role());
        model.addAttribute("op", "新增");
        return "role/edit";
    }

    @RequiresPermissions("role:create")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String create(Role role, RedirectAttributes redirectAttributes) {
        roleService.createRole(role);
        redirectAttributes.addFlashAttribute("msg", "新增成功");
        return "redirect:/role";
    }

    @RequiresPermissions("role:update")
    @RequestMapping(value = "/{id}/update", method = RequestMethod.GET)
    public String showUpdateForm(@PathVariable("id") Long id, Model model) {
        setCommonData(model);
        Role role=roleService.findOne(id);
        
    	StringBuilder s = new StringBuilder();
    	List<Long> resourceIds=role.getResourceIds();
        for(Long resourceId : resourceIds) {
            Resource resource = resourceService.findOne(resourceId);

            s.append(resource.getName());
            s.append(",");
        }
        if(s.length() > 0) {
            s.deleteCharAt(s.length() - 1);
        }
       
       
        model.addAttribute("role", role);
        model.addAttribute("resourcename", s.toString());
        model.addAttribute("op", "修改");
        return "role/edit";
    }

    @RequiresPermissions("role:update")
    @RequestMapping(value = "/{id}/update", method = RequestMethod.POST)
    public String update(Role role, RedirectAttributes redirectAttributes) {
        roleService.updateRole(role);
        redirectAttributes.addFlashAttribute("msg", "修改成功");
        return "redirect:/role";
    }

    @RequiresPermissions("role:delete")
    @RequestMapping(value = "/{id}/delete", method = RequestMethod.GET)
    public String showDeleteForm(@PathVariable("id") Long id, Model model) {
        setCommonData(model);
        model.addAttribute("role", roleService.findOne(id));
        model.addAttribute("op", "删除");
        return "role/edit";
    }

    @RequiresPermissions("role:delete")
    @RequestMapping(value = "/{id}/delete", method = RequestMethod.POST)
    public String delete(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        roleService.deleteRole(id);
        redirectAttributes.addFlashAttribute("msg", "删除成功");
        return "redirect:/role";
    }

    private void setCommonData(Model model) {
        model.addAttribute("resourceList", resourceService.findAll());
    }

}
