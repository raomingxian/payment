package com.gfcz.business.payment.web.controller;

import java.io.Serializable;

public  class  PaymentSerachBean  implements Serializable{

	private static final long serialVersionUID = 1L;

	private String field;
	
	private String op;
	
	private String data;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getOp() {
		return op;
	}

	public void setOp(String op) {
		this.op = op;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
	
	
}
