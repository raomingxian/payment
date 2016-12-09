package com.gfcz.business.payment.web.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the sys_organization database table.
 * 
 */
@Entity
@Table(name="sys_organization")
@NamedQuery(name="Organization.findAll", query="SELECT o FROM Organization o")
public class Organization implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Column(name="organization_name")
	private String organizationName;

	//bi-directional many-to-one association to Department
	@ManyToOne
	@JoinColumn(name="department_id")
	private Department sysDepartment;

	public Organization() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrganizationName() {
		return this.organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public Department getSysDepartment() {
		return this.sysDepartment;
	}

	public void setSysDepartment(Department sysDepartment) {
		this.sysDepartment = sysDepartment;
	}

}