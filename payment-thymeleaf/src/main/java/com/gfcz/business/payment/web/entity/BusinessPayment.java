package com.gfcz.business.payment.web.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;



@Entity
@Table(name="business_payment")
public class BusinessPayment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="budget_project")
	private String budgetProject;

	private String caption;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="creation_time")
	private Date creationTime;

	@Column(name="expenditure_structure")
	private String expenditureStructure;

	@Column(name="functional_class")
	private String functionalClass;

	@Column(name="manage_department")
	private String manageDepartment;

	@Column(name="money_sums")
	private String moneySums;

	@Column(name="money_used")
	private String moneyUsed;

	@Column(name="money_useless")
	private String moneyUseless;

	@Column(name="organization_id")
	private int organizationId;

	@Column(name="origin_index")
	private String originIndex;

	private int parent;

	private int state1;

	private int state2;

	private int state3;

	@Column(name="user_id")
	private int userId;

	public BusinessPayment() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBudgetProject() {
		return this.budgetProject;
	}

	public void setBudgetProject(String budgetProject) {
		this.budgetProject = budgetProject;
	}

	public String getCaption() {
		return this.caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public Date getCreationTime() {
		return this.creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public String getExpenditureStructure() {
		return this.expenditureStructure;
	}

	public void setExpenditureStructure(String expenditureStructure) {
		this.expenditureStructure = expenditureStructure;
	}

	public String getFunctionalClass() {
		return this.functionalClass;
	}

	public void setFunctionalClass(String functionalClass) {
		this.functionalClass = functionalClass;
	}

	public String getManageDepartment() {
		return this.manageDepartment;
	}

	public void setManageDepartment(String manageDepartment) {
		this.manageDepartment = manageDepartment;
	}

	public String getMoneySums() {
		return this.moneySums;
	}

	public void setMoneySums(String moneySums) {
		this.moneySums = moneySums;
	}

	public String getMoneyUsed() {
		return this.moneyUsed;
	}

	public void setMoneyUsed(String moneyUsed) {
		this.moneyUsed = moneyUsed;
	}

	public String getMoneyUseless() {
		return this.moneyUseless;
	}

	public void setMoneyUseless(String moneyUseless) {
		this.moneyUseless = moneyUseless;
	}

	public int getOrganizationId() {
		return this.organizationId;
	}

	public void setOrganizationId(int organizationId) {
		this.organizationId = organizationId;
	}

	public String getOriginIndex() {
		return this.originIndex;
	}

	public void setOriginIndex(String originIndex) {
		this.originIndex = originIndex;
	}

	public int getParent() {
		return this.parent;
	}

	public void setParent(int parent) {
		this.parent = parent;
	}

	public int getState1() {
		return this.state1;
	}

	public void setState1(int state1) {
		this.state1 = state1;
	}

	public int getState2() {
		return this.state2;
	}

	public void setState2(int state2) {
		this.state2 = state2;
	}

	public int getState3() {
		return this.state3;
	}

	public void setState3(int state3) {
		this.state3 = state3;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

}