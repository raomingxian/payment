package com.gfcz.business.payment.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gfcz.business.payment.web.entity.SysUser;

public interface UserIDao extends JpaRepository<SysUser, String> {
 
	public SysUser findByUsername(String username);
}
