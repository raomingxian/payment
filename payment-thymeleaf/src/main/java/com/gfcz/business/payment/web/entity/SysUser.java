package com.gfcz.business.payment.web.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the sys_user database table.
 * 
 */
@Entity
@Table(name="sys_user")
@NamedQuery(name="SysUser.findAll", query="SELECT s FROM SysUser s")
public class SysUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private byte locked;

	private String password;

	private String realname;

	@Column(name="role_ids")
	private String roleIds;

	private String salt;

	private String username;

	//bi-directional many-to-one association to Department
	@ManyToOne
	@JoinColumn(name="department_id")
	private Department sysDepartment;

	public SysUser() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getLocked() {
		return this.locked;
	}

	public void setLocked(byte locked) {
		this.locked = locked;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRealname() {
		return this.realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getRoleIds() {
		return this.roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getSalt() {
		return this.salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
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