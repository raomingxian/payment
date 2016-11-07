package com.gfcz.business.payment.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gfcz.business.payment.web.entity.BusinessPayment;

public interface IPaymentDao extends JpaRepository<BusinessPayment, Integer> {

}
