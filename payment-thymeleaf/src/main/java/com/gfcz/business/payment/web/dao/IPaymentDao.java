package com.gfcz.business.payment.web.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gfcz.business.payment.web.entity.BusinessPayment;

public interface IPaymentDao extends JpaRepository<BusinessPayment, Integer> ,JpaSpecificationExecutor<BusinessPayment>{

	@Modifying
	@Query(value="update BusinessPayment bp set bp.state1=:status WHERE bp.id=:id")
	public int auditStatus(@Param("id")int id,@Param("status")int status);
	
	
	@Query(value="select COALESCE(SUM(busp.money_used),0) FROM business_payment busp where busp.parent=:parent",nativeQuery=true)
	public float sumMoneyUsedByParent(@Param("parent")int parent);
	
	public List<BusinessPayment> findByParent(int id);
	
	
	public Page<BusinessPayment> findByParent(int id,Pageable pageable);
	
	public Page<BusinessPayment> findByParentAndUsername(int id,String username,Pageable pageable);
	
	
	public Page<BusinessPayment> findByParentAndUsername(int id,String username,Specification<BusinessPayment> spec,Pageable pageable);

//    Page<BusinessPayment> findAll(Specification<BusinessPayment> spec, Pageable pageable);  //分页按条件查询  
	
	
	
	
	
}
