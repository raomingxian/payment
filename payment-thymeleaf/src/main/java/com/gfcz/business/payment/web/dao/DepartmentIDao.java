package com.gfcz.business.payment.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gfcz.business.payment.web.entity.Department;

public interface DepartmentIDao extends JpaRepository<Department, Integer> {

}
