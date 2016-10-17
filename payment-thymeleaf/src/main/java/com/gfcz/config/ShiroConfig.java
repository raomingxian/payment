package com.gfcz.config;

import java.util.Map;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;

import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.session.mgt.eis.JavaUuidSessionIdGenerator;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.filter.DelegatingFilterProxy;

import com.gfcz.shiro.chapter16.realm.UserRealm;
import com.google.common.collect.Maps;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;

@Configuration
public class ShiroConfig {
	
//	@Bean
//	public RetryLimitHashedCredentialsMatcher credentialsMatcher(){
//		RetryLimitHashedCredentialsMatcher retryLimitHashedCredentialsMatcher=new RetryLimitHashedCredentialsMatcher((CacheManager) securityManager());
//		
//		retryLimitHashedCredentialsMatcher.setHashAlgorithmName("md5");
//		retryLimitHashedCredentialsMatcher.setHashIterations(2);
//		retryLimitHashedCredentialsMatcher.setStoredCredentialsHexEncoded(true);
//		return retryLimitHashedCredentialsMatcher;
//	}
	
	/**
	 * FilterRegistrationBean
	 * @return
	 */
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter")); 
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*"); 
        filterRegistration.setDispatcherTypes(DispatcherType.REQUEST);
        return filterRegistration;
	}
	
	/**
	 * Shiro的Web过滤器
	 * @see org.apache.shiro.spring.web.ShiroFilterFactoryBean
	 * @return
	 */
	@Bean(name = "shiroFilter")
	public ShiroFilterFactoryBean shiroFilter(){
		ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
		bean.setSecurityManager(securityManager());
		bean.setLoginUrl("/login");
		bean.setSuccessUrl("/index");
		Map<String, Filter> filters = Maps.newHashMap();
		filters.put("perms", urlPermissionsFilter());
//		filters.put("anon", new AnonymousFilter());
		bean.setFilters(filters);
		
		Map<String, String> chains = Maps.newHashMap();
		chains.put("/login", "anon");
		chains.put("/logout", "logout");
		chains.put("/base/**", "anon");     //静态资源
		chains.put("/css/**", "anon");	    //静态资源
		chains.put("/img/**", "anon");    //静态资源
		chains.put("/assets/**", "anon");    //静态资源
		chains.put("/css/**", "anon");    //静态资源
		chains.put("/js/**", "anon");    //静态资源
		chains.put("/jquery-treetable/**", "anon");    //静态资源
		chains.put("/js/**", "anon");    //静态资源
		chains.put("/**", "authc,perms");   //auths认证  perms权限 
//		chains.put("/**", "authc"); 
//		chains.put("/**", "anon");//anon 可以理解为不拦截
		bean.setFilterChainDefinitionMap(chains);
		return bean;
	}
	
	/**
	 * @see org.apache.shiro.mgt.SecurityManager
	 * @return
	 */
	@Bean(name="securityManager")
	public DefaultWebSecurityManager securityManager() {
		DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
		manager.setRealm(userRealm());
		manager.setCacheManager(cacheManager());
		manager.setSessionManager(defaultWebSessionManager());
		return manager;
	}
	
	/**
	 * @see DefaultWebSessionManager
	 * @return
	 */
	@Bean(name="sessionManager")
	public DefaultWebSessionManager defaultWebSessionManager() {
		DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
		sessionManager.setCacheManager(cacheManager());
		sessionManager.setGlobalSessionTimeout(1800000);
		sessionManager.setDeleteInvalidSessions(true);
		sessionManager.setSessionValidationSchedulerEnabled(true);
		sessionManager.setDeleteInvalidSessions(true);
		return sessionManager;
	}
	
	/**
	 * @see UserRealm--->AuthorizingRealm
	 * @return
	 */
	@Bean
//	@DependsOn(value="lifecycleBeanPostProcessor")
	public UserRealm userRealm() {
		UserRealm userRealm = new UserRealm();
		userRealm.setCredentialsMatcher(new HashedCredentialsMatcher("md5"));
		userRealm.setCachingEnabled(false);
//		userRealm.setCacheManager(cacheManager());
		return userRealm;
	}
	
	@Bean
	public URLPermissionsFilter urlPermissionsFilter() {
		return new URLPermissionsFilter();
	}
	
	@Bean
	public EhCacheManager cacheManager() {
		EhCacheManager cacheManager = new EhCacheManager();
		cacheManager.setCacheManagerConfigFile("classpath:ehcache.xml");
		return cacheManager;
	}
	
	@Bean
	public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
		return new LifecycleBeanPostProcessor();
	}
	
	
//	@Bean
//	public JavaUuidSessionIdGenerator sessionIdGenerator(){
//		return new JavaUuidSessionIdGenerator();
//	}
//	
//	@Bean
//	public SimpleCookie sessionIdCookie(){
//		SimpleCookie simpleCookie=new SimpleCookie("sid");
//		simpleCookie.setHttpOnly(true);
//		simpleCookie.setMaxAge(-1);
//		return simpleCookie;
//	}
//	
//	@Bean
//	public CookieRememberMeManager rememberMeManager(){
//		CookieRememberMeManager cookieRememberMeManager=new CookieRememberMeManager();
//		cookieRememberMeManager.setCipherKey(#{T(org.apache.shiro.codec.Base64).decode('4AvVhmFLUs0KTA3Kprsdag==')});
//	}
//	
//	@Bean
//	public SimpleCookie rememberMeCookie(){
//		
//	}
	@Bean
	public FormAuthenticationFilter formAuthenticationFilter(){
		FormAuthenticationFilter formAuthenticationFilter=new FormAuthenticationFilter();
		formAuthenticationFilter.setUsernameParam("username");
		formAuthenticationFilter.setPasswordParam("password");
		formAuthenticationFilter.setRememberMeParam("rememberMe");
		formAuthenticationFilter.setLoginUrl("/login");
		formAuthenticationFilter.setSuccessUrl("/index");
		return formAuthenticationFilter;
		
	}
	
	 /**  
	   * ShiroDialect，为了在thymeleaf里使用shiro的标签的bean  
	   * @return  
	   */  
	  @Bean  
	  public ShiroDialect shiroDialect(){  
		  return new ShiroDialect();  
	  }

	
}