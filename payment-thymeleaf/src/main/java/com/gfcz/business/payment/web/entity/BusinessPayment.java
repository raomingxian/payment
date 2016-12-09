package com.gfcz.business.payment.web.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the business_payment database table.
 * 
 */
@Entity
@Table(name="business_payment")
@NamedQuery(name="BusinessPayment.findAll", query="SELECT b FROM BusinessPayment b")
public class BusinessPayment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
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

	@Column(name="money_sums")
	private double moneySums;

	@Column(name="money_used")
	private double moneyUsed;

	@Column(name="money_useless")
	private String moneyUseless;

	@Column(name="organization_id")
	private String organizationId;

	@Column(name="origin_index")
	private String originIndex;

	private int parent;

	private int state1;

	private int state2;

	private int state3;

	private String username;

	//bi-directional many-to-one association to Department
	@ManyToOne
	@JoinColumn(name="department_id")
	private Department sysDepartment;

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

	public double getMoneySums() {
		return this.moneySums;
	}

	public void setMoneySums(double moneySums) {
		this.moneySums = moneySums;
	}

	public double getMoneyUsed() {
		return this.moneyUsed;
	}

	public void setMoneyUsed(double moneyUsed) {
		this.moneyUsed = moneyUsed;
	}

	public String getMoneyUseless() {
		return this.moneyUseless;
	}

	public void setMoneyUseless(String moneyUseless) {
		this.moneyUseless = moneyUseless;
	}

	public String getOrganizationId() {
		return this.organizationId;
	}

	public void setOrganizationId(String organizationId) {
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

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Department getSysDepartment() {
		return this.sysDepartment;
	}

	public void setSysDepartment(Department sysDepartment) {
		this.sysDepartment = sysDepartment;
	}

}