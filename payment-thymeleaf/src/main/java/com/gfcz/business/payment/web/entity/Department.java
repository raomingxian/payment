package com.gfcz.business.payment.web.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the sys_department database table.
 * 
 */
@Entity
@Table(name="sys_department")
@NamedQuery(name="Department.findAll", query="SELECT d FROM Department d")
public class Department implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Column(name="department_name")
	private String departmentName;

	//bi-directional many-to-one association to BusinessPayment
	@JsonIgnore
	@OneToMany(mappedBy="sysDepartment")
	private List<BusinessPayment> businessPayments;

	//bi-directional many-to-one association to Organization
	@JsonIgnore
	@OneToMany(mappedBy="sysDepartment")
	private List<Organization> sysOrganizations;

	//bi-directional many-to-one association to SysUser
	@JsonIgnore
	@OneToMany(mappedBy="sysDepartment")
	private List<SysUser> sysUsers;

	public Department() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDepartmentName() {
		return this.departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public List<BusinessPayment> getBusinessPayments() {
		return this.businessPayments;
	}

	public void setBusinessPayments(List<BusinessPayment> businessPayments) {
		this.businessPayments = businessPayments;
	}

	public BusinessPayment addBusinessPayment(BusinessPayment businessPayment) {
		getBusinessPayments().add(businessPayment);
		businessPayment.setSysDepartment(this);

		return businessPayment;
	}

	public BusinessPayment removeBusinessPayment(BusinessPayment businessPayment) {
		getBusinessPayments().remove(businessPayment);
		businessPayment.setSysDepartment(null);

		return businessPayment;
	}

	public List<Organization> getSysOrganizations() {
		return this.sysOrganizations;
	}

	public void setSysOrganizations(List<Organization> sysOrganizations) {
		this.sysOrganizations = sysOrganizations;
	}

	public Organization addSysOrganization(Organization sysOrganization) {
		getSysOrganizations().add(sysOrganization);
		sysOrganization.setSysDepartment(this);

		return sysOrganization;
	}

	public Organization removeSysOrganization(Organization sysOrganization) {
		getSysOrganizations().remove(sysOrganization);
		sysOrganization.setSysDepartment(null);

		return sysOrganization;
	}

	public List<SysUser> getSysUsers() {
		return this.sysUsers;
	}

	public void setSysUsers(List<SysUser> sysUsers) {
		this.sysUsers = sysUsers;
	}

	public SysUser addSysUser(SysUser sysUser) {
		getSysUsers().add(sysUser);
		sysUser.setSysDepartment(this);

		return sysUser;
	}

	public SysUser removeSysUser(SysUser sysUser) {
		getSysUsers().remove(sysUser);
		sysUser.setSysDepartment(null);

		return sysUser;
	}

}