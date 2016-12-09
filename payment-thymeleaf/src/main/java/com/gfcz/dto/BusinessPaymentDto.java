package com.gfcz.dto;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.gfcz.business.payment.web.entity.Department;
import com.gfcz.tools.ExcelResources;


public class BusinessPaymentDto{
	
	
	private int id;

	
	private String budgetProject;
	
	private String caption;


	
	private Date creationTime;

	
	private String expenditureStructure;

	
	private String functionalClass;

	
	private double moneySums;

	
	private double moneyUsed;

	
	private String moneyUseless;

	
	private String organizationId;

	
	private String originIndex;

	private int parent;
	
	private String state1;
	
	private String state2;
	
	private String state3;
//	@ExcelResources(title="网站名称",order=1)
	private String username;
	
	private Department sysDepartment;

	//bi-directional many-to-one association to Department

//	private Department sysDepartment;

	public BusinessPaymentDto() {
	}
	@ExcelResources(title="序号",order=1)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}
	@ExcelResources(title="预算项目",order=2)
	public String getBudgetProject() {
		return this.budgetProject;
	}

	public void setBudgetProject(String budgetProject) {
		this.budgetProject = budgetProject;
	}
	@ExcelResources(title="备注",order=3)
	public String getCaption() {
		return this.caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}
	@ExcelResources(title="创建时间",order=4)
	public Date getCreationTime() {
		return this.creationTime;
	}

	public void setCreationTime(Date creationTime) {
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
//		String formatData =sdf.format(creationTime);
//		  ParsePosition pos = new ParsePosition(8);
//		  Date currentTime_2 = sdf.parse(formatData, pos);
//		this.creationTime = currentTime_2;
		this.creationTime = creationTime;
	}
	@ExcelResources(title="支出结构",order=4)
	public String getExpenditureStructure() {
		return this.expenditureStructure;
	}
	
	public void setExpenditureStructure(String expenditureStructure) {
		this.expenditureStructure = expenditureStructure;
	}
	@ExcelResources(title="功能分类",order=6)
	public String getFunctionalClass() {
		return this.functionalClass;
	}
	
	public void setFunctionalClass(String functionalClass) {
		this.functionalClass = functionalClass;
	}
	@ExcelResources(title="金额",order=7)
	public double getMoneySums() {
		return this.moneySums;
	}

	public void setMoneySums(double moneySums) {
		this.moneySums = moneySums;
	}
	@ExcelResources(title="已用金额",order=8)
	public double getMoneyUsed() {
		return this.moneyUsed;
	}

	public void setMoneyUsed(double moneyUsed) {
		this.moneyUsed = moneyUsed;
	}
	@ExcelResources(title="资金性质",order=9)
	public String getMoneyUseless() {
		return this.moneyUseless;
	}

	public void setMoneyUseless(String moneyUseless) {
		this.moneyUseless = moneyUseless;
	}
	@ExcelResources(title="预算单位",order=10)
	public String getOrganizationId() {
		return this.organizationId;
	}

	public void setOrganizationId(String organizationId) {
		this.organizationId = organizationId;
	}
	@ExcelResources(title="指标来源",order=11)
	public String getOriginIndex() {
		return this.originIndex;
	}

	public void setOriginIndex(String originIndex) {
		this.originIndex = originIndex;
	}

//	public int getParent() {
//		return this.parent;
//	}
//
//	public void setParent(int parent) {
//		this.parent = parent;
//	}

	@ExcelResources(title="预算审核状态",order=12)
	public String getState1() {
		return this.state1;
	}

	public void setState1(String state1) {
		if(state1=="1"||"1".equals(state1)){
			this.state1 = "审核通过";
		}else if(state1=="2"||"2".equals(state1)){
			this.state1 = "审核未通过";
		}else if(state1=="0"||"0".equals(state1)){
			this.state1 = "未审核";
		}else{
			this.state1 = state1;
		}
		
		
	}
	@ExcelResources(title="国库审核状态",order=12)
	public String getState2() {
		return this.state2;
	}

	public void setState2(String state2) {
		if(state2=="1"||"1".equals(state2)){
			this.state2 = "审核通过";
		}else if(state2=="2"||"2".equals(state2)){
			this.state1 = "审核未通过";
		}else if(state2=="0"||"0".equals(state2)){
			this.state2 = "未审核";
		}else{
			this.state2 = state2;
		}
	}
//	@ExcelResources(title="审核状态",order=12)
	public String getState3() {
		return this.state3;
	}

	public void setState3(String state3) {
		if(state1=="1"||"1".equals(state1)){
			this.state1 = "审核通过";
		}else if(state1=="2"||"2".equals(state1)){
			this.state1 = "审核未通过";
		}else if(state1=="0"||"0".equals(state1)){
			this.state1 = "未审核";
		}else{
			this.state1 = state1;
		}
	}
	public int getParent() {
		return parent;
	}
	public void setParent(int parent) {
		this.parent = parent;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Department getSysDepartment() {
		return sysDepartment;
	}
	public void setSysDepartment(Department sysDepartment) {
		this.sysDepartment = sysDepartment;
	}
	
	
	

//	public String getUsername() {
//		return this.username;
//	}
//
//	public void setUsername(String username) {
//		this.username = username;
//	}

//	public Department getSysDepartment() {
//		return this.sysDepartment;
//	}
//
//	public void setSysDepartment(Department sysDepartment) {
//		this.sysDepartment = sysDepartment;
//	}

}