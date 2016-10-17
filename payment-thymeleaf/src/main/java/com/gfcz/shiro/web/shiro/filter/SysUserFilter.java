package com.gfcz.shiro.web.shiro.filter;
//package com.gfcz.shiro.chapter16.web.shiro.filter;
//
//import com.gfcz.shiro.chapter16.Constants;
//import com.gfcz.shiro.chapter16.service.UserService;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.web.filter.PathMatchingFilter;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//

//public class SysUserFilter extends PathMatchingFilter {
//
//    @Autowired
//    private UserService userService;
//
//    @Override
//    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
//
//        String username = (String)SecurityUtils.getSubject().getPrincipal();
//        request.setAttribute(Constants.CURRENT_USER, userService.findByUsername(username));
//        return true;
//    }
//}
