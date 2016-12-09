package com.gfcz.business.payment.web.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gfcz.business.payment.web.entity.Department;
import com.gfcz.business.payment.web.entity.Organization;



public interface OrganizationIDao extends JpaRepository<Organization, Integer> {

	

	public List<Organization> findBySysDepartment(Department department);
	
}
