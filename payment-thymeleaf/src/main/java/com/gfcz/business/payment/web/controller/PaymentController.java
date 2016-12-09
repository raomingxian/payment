package com.gfcz.business.payment.web.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.fasterxml.jackson.databind.JsonNode;
import com.gfcz.business.payment.web.dao.DepartmentIDao;
import com.gfcz.business.payment.web.dao.IPaymentDao;
import com.gfcz.business.payment.web.dao.UserIDao;
import com.gfcz.business.payment.web.entity.BusinessPayment;
import com.gfcz.dto.BusinessPaymentDto;
import com.gfcz.tools.ExcelUtil;

import javax.persistence.criteria.Path;

//import net.minidev.json.JSONObject;

@RestController
@RequestMapping(value = "/payment")
public class PaymentController {

	private static org.slf4j.Logger logger =LoggerFactory.getLogger(PaymentController.class);
	
	
	@Autowired
	private IPaymentDao iPaymentDao;
	// @Autowired
	// private IPaymentSearchDao iPaymentSearchDao;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private UserIDao userIDao;
	@Autowired
	private DepartmentIDao departmentIDao;
	
    //获取上传的文件夹，具体路径参考application.properties中的配置
    @Value("${web.upload-path}")
    private String uploadPath;

	

	/**
	 * 查询预算
	 * 
	 * @return
	 */

	@RequiresPermissions("payment:view")
	@RequestMapping(value = "/view")
	public Page<BusinessPayment> findPayment() {
		// filters={"groupOp":"AND","rules":[{"field":"organizationId","op":"bw","data":"12"},{"field":"originIndex","op":"bw","data":"付"}]}
		logger.info("heheheheh呵呵eheh");
		Subject subject = SecurityUtils.getSubject();
		String userName = subject.getPrincipal().toString();
		int page = 1;
		if (request.getParameter("page") != null && !"".equals(request.getParameter("page"))) {
			page = Integer.valueOf(request.getParameter("page"));
		}

		PageRequest pageRequest = buildPageRequest(page, 10);
		
		Specification<BusinessPayment> spec = new Specification<BusinessPayment>() {
			public Predicate toPredicate(Root<BusinessPayment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();
				
				String filterss = request.getParameter("filters");
				 List<Map<String,String>> paymentSerachList=new ArrayList<Map<String,String>>();
				
				if(filterss!=null&&!"".equals(filterss)){
//				for(PaymentSerachBean paymentSerachBean:paymentSerachBeans){
					paymentSerachList=PaymentController.readJson2List(filterss);
					for(int i=0;i<paymentSerachList.size();i++){
					if(paymentSerachList.get(i).get("field")=="moneySums"||"moneySums".equals(paymentSerachList.get(i).get("field"))){
						
					
						if(paymentSerachList.get(i).get("op")=="gt"||"gt".equals(paymentSerachList.get(i).get("op"))){
							list.add(cb.equal(root.get("moneySums").as(Double.class),
									Double.valueOf(paymentSerachList.get(i).get("data")) ));
						}else if(paymentSerachList.get(i).get("op")=="lt"||"lt".equals(paymentSerachList.get(i).get("op"))){
							list.add(cb.equal(root.get("moneySums").as(Double.class),
									Double.valueOf(paymentSerachList.get(i).get("data"))));
						}else if(paymentSerachList.get(i).get("op")=="eq"||"eq".equals(paymentSerachList.get(i).get("op"))){
							list.add(cb.equal(root.get("moneySums").as(Double.class),
									1));
						}
						
					}else if(paymentSerachList.get(i).get("field")=="creationTime"||"creationTime".equals(paymentSerachList.get(i).get("field"))){
						String[] ym=paymentSerachList.get(i).get("data").split("-");
						YearMonth aa= YearMonth.of(Integer.valueOf(ym[0]),Integer.valueOf(ym[1]));
					    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
					    Date startDate=new Date();
					    Date stopDate=new Date();
						try {
							startDate = sdf.parse(aa.atDay(1).toString());
							stopDate = sdf.parse(aa.plusMonths(1).atDay(1).toString());
						} catch (ParseException e) {
							e.printStackTrace();
						} 
						Expression<Date> startDateExp = cb.literal(startDate);
						Expression<Date> stopDateExp =cb.literal(stopDate);
						list.add(cb.between(root.get("creationTime").as(Date.class),startDateExp, stopDateExp));
					}else{
						list.add(cb.like(root.get(paymentSerachList.get(i).get("field")).as(String.class),
								"%" + paymentSerachList.get(i).get("data")+ "%"));
					}
				}
					}
				
				list.add(cb.equal(root.get("username").as(String.class), userName));
				list.add(cb.equal(root.get("parent").as(Integer.class), 0));

//				if (request.getParameter("originIndex") != null
//						&& request.getParameter("originIndex").trim().length() > 0) {
//					list.add(cb.like(root.get("originIndex").as(String.class),
//							"%" + request.getParameter("originIndex") + "%"));
//				}
//				if (request.getParameter("expenditureStructure") != null
//						&& request.getParameter("expenditureStructure").trim().length() > 0) {
//					list.add(cb.like(root.get("expenditureStructure").as(String.class),
//							"%" + request.getParameter("expenditureStructure") + "%"));
//				}
				Predicate[] p = new Predicate[list.size()];
				return cb.and(list.toArray(p));
			}
		};

		// Specification<BusinessPayment> spec = new
		// Specification<BusinessPayment>() {
		//
		// public Predicate toPredicate(Root<BusinessPayment> root,
		// CriteriaQuery<?> query, CriteriaBuilder cb) {
		//// Path<String> namePath =root.get("expenditureStructure");
		// Path<String> parent = root.get("parent");
		// Path<String> namepath = root.get("username");
		//// return query.where(cb.like(namePath,
		// "%"+request.getParameter("expenditureStructure")+"%"),
		// cb.like(nicknamePath,
		// "%"+request.getParameter("origin_index")+"%")).getRestriction();
		// return query.where(cb.equal(namepath.as(String.class),
		// userName),cb.equal(parent.as(Integer.class), 0)).getRestriction();
		// }
		// };

		return iPaymentDao.findAll(spec, pageRequest);
		// return
		// iPaymentDao.findByParentAndUsername(0,userName,spec,pageRequest);

	}

	/**
	 * 查询子预算
	 * 
	 * @return
	 */
	@RequiresPermissions("payment:view")
	@RequestMapping(value = "/view/{parentid}")
	public Map findSonPayment(@PathVariable("parentid") int parentid) {
		Subject subject = SecurityUtils.getSubject();
		String userName = subject.getPrincipal().toString();
		Map map = new HashMap();
		int page = 1;
		if (request.getParameter("page") != null && !"".equals(request.getParameter("page"))) {
			page = Integer.valueOf(request.getParameter("page"));
		}

		PageRequest pageRequest = buildPageRequest(page, 5);

		Specification<BusinessPayment> spec = new Specification<BusinessPayment>() {

			public Predicate toPredicate(Root<BusinessPayment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// Path<String> namePath =root.get("expenditureStructure");
				Path<String> parent = root.get("parent");
				Path<String> namepath = root.get("username");
				// return query.where(cb.like(namePath,
				// "%"+request.getParameter("expenditureStructure")+"%"),
				// cb.like(nicknamePath,
				// "%"+request.getParameter("origin_index")+"%")).getRestriction();
				return query.where(cb.equal(namepath.as(String.class), userName),
						cb.equal(parent.as(Integer.class), parentid)).getRestriction();
			}
		};
		Page<BusinessPayment> pag = iPaymentDao.findAll(spec, pageRequest);
		map.put("page", pag);

		double userdMoney = iPaymentDao.sumMoneyUsedByParent(parentid);
		double sumMoney = Double.valueOf(iPaymentDao.findOne(parentid).getMoneySums());

		double syMoney = sumMoney - userdMoney;

		Map<String, String> hashMap = new HashMap<String, String>();
		hashMap.put("caption", "总预算金额:" + iPaymentDao.findOne(parentid).getMoneySums());
		hashMap.put("state1", "已申请预算总计:" + userdMoney);
		hashMap.put("state2", "剩余预算:" + syMoney);
		// hashMap.put("password", "123abc");

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String userMapJson = objectMapper.writeValueAsString(hashMap);

			JsonNode node = objectMapper.readTree(userMapJson);
			map.put("userdata", node);
		} catch (IOException e) {
		}
		return map;
	}

	/**
	 * 审核预算查询
	 * 
	 * @return
	 */

	@RequiresPermissions(value = { "payment:state", "payment:state1" }, logical = Logical.OR)
	@RequestMapping(value = "/view/check")
	public Page<BusinessPayment> findCheckPayment() {
		int page = 1;
		if (request.getParameter("page") != null && !"".equals(request.getParameter("page"))) {
			page = Integer.valueOf(request.getParameter("page"));
		}

		PageRequest pageRequest = buildPageRequest(page, 10);
		return iPaymentDao.findByParent(0, pageRequest);

	}

	/**
	 * 审核子预算查询
	 * 
	 * @return
	 */
	@RequiresPermissions(value = { "payment:state", "payment:state1" }, logical = Logical.OR)
	@RequestMapping(value = "/view/check/{parentid}")
	public Map findCheckSonPayment(@PathVariable("parentid") int parentid) {
		Map map = new HashMap();
		int page = 1;
		if (request.getParameter("page") != null && !"".equals(request.getParameter("page"))) {
			page = Integer.valueOf(request.getParameter("page"));
		}

		PageRequest pageRequest = buildPageRequest(page, 5);

		Page<BusinessPayment> pag = iPaymentDao.findByParent(parentid, pageRequest);
		map.put("page", pag);

		double userdMoney = iPaymentDao.sumMoneyUsedByParent(parentid);
		double sumMoney = Double.valueOf(iPaymentDao.findOne(parentid).getMoneySums());

		double syMoney = sumMoney - userdMoney;

		Map<String, String> hashMap = new HashMap<String, String>();
		hashMap.put("caption", "总预算金额:" + iPaymentDao.findOne(parentid).getMoneySums());
		hashMap.put("state1", "已申请预算总计:" + userdMoney);
		hashMap.put("state2", "剩余预算:" + syMoney);
		// hashMap.put("password", "123abc");

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String userMapJson = objectMapper.writeValueAsString(hashMap);

			JsonNode node = objectMapper.readTree(userMapJson);
			map.put("userdata", node);
		} catch (IOException e) {
		}
		return map;
	}

	/**
	 * 创建分页请求.
	 */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize) {
		Sort sort = null;

		sort = new Sort(Direction.DESC, "id");

		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}

	/**
	 * 
	 * @param oper
	 *            操作类型 del：删除 add：增加 edit：编辑
	 * @return
	 */
	@RequiresPermissions(value = { "payment:delete", "payment:update", "payment:create" }, logical = Logical.OR)
	@RequestMapping(value = "/update")
	public String update(@RequestParam(value = "oper") String oper) { // @RequestBody
																		// 获取实体类

		Subject subject = SecurityUtils.getSubject();
		String userName = subject.getPrincipal().toString();
		if ("del".equals(oper)) {
			String[] ids = request.getParameter("id").split(",");
			for (String id : ids) {
				iPaymentDao.delete(Integer.parseInt(id));
			}

		} else if ("add".equals(oper)) {

//			Object entity = entityClass.newInstance();
//            
//            //把请求中的参数取出
//            Map allParams = request.getParameterMap();
//            Set entries = allParams.entrySet();
//            for (Iterator iterator = entries.iterator(); iterator.hasNext();) {
//                Map.Entry entry = (Map.Entry) iterator.next();
//                String name = (String)entry.getKey();
//                Object[] value = (Object[])entry.getValue();
//                 
//                if(value != null){
//                    if(value.length == 1){
//                        BeanUtils.copyProperty(entity, name, value[0]);
//                    }else{
//                        BeanUtils.copyProperty(entity, name, value);
//                    }
//                }
//            }
//            return entity;
			
			
			
			BusinessPayment businessPayment = new BusinessPayment();
			businessPayment.setBudgetProject(request.getParameter("budgetProject"));
			businessPayment.setCaption(request.getParameter("caption"));
			businessPayment.setCreationTime(new Date());
			businessPayment.setExpenditureStructure(request.getParameter("expenditureStructure"));
			businessPayment.setFunctionalClass(request.getParameter("functionalClass"));
			businessPayment.setSysDepartment(userIDao.findByUsername(userName).getSysDepartment());
			businessPayment.setMoneySums(Double.valueOf(request.getParameter("moneySums")));
			// businessPayment.setMoneyUsed(Double.valueOf(request.getParameter("moneyUsed")));
			businessPayment.setMoneyUseless(request.getParameter("moneyUseless"));
			businessPayment.setOrganizationId(request.getParameter("organizationId"));
			businessPayment.setOriginIndex(request.getParameter("originIndex"));
			businessPayment.setUsername(userName);
			businessPayment.setState1(0);
			businessPayment.setState2(0);
			businessPayment.setState3(0);
			iPaymentDao.save(businessPayment);
		} else if ("edit".equals(oper)) {

			BusinessPayment businessPayment = iPaymentDao.findOne(Integer.valueOf(request.getParameter("id")));
			businessPayment.setId(Integer.valueOf(request.getParameter("id")));
			if (request.getParameter("budgetProject") != null && !"".equals(request.getParameter("budgetProject")))
				businessPayment.setBudgetProject(request.getParameter("budgetProject"));
			if (request.getParameter("caption") != null && !"".equals(request.getParameter("caption")))
				businessPayment.setCaption(request.getParameter("caption"));
			businessPayment.setCreationTime(new Date());
			if (request.getParameter("expenditureStructure") != null
					&& !"".equals(request.getParameter("expenditureStructure")))
				businessPayment.setExpenditureStructure(request.getParameter("expenditureStructure"));
			if (request.getParameter("functionalClass") != null && !"".equals(request.getParameter("functionalClass")))
				businessPayment.setFunctionalClass(request.getParameter("functionalClass"));
			if (request.getParameter("manageDepartment") != null
					&& !"".equals(request.getParameter("manageDepartment")))
				businessPayment.setSysDepartment(userIDao.findByUsername(userName).getSysDepartment());
			if (request.getParameter("moneySums") != null && !"".equals(request.getParameter("moneySums")))
				businessPayment.setMoneyUsed(Double.valueOf(request.getParameter("moneySums")));
			if (request.getParameter("moneyUsed") != null && !"".equals(request.getParameter("moneyUsed")))
				businessPayment.setMoneySums(Double.valueOf(request.getParameter("moneyUsed")));
			if (request.getParameter("moneyUseless") != null && !"".equals(request.getParameter("moneyUseless")))
				businessPayment.setMoneyUseless(request.getParameter("moneyUseless"));
			if (request.getParameter("organizationId") != null && !"".equals(request.getParameter("organizationId")))
				businessPayment.setOrganizationId(request.getParameter("organizationId"));
			if (request.getParameter("originIndex") != null && !"".equals(request.getParameter("originIndex")))
				businessPayment.setOriginIndex(request.getParameter("originIndex"));
			// if(request.getParameter("id")!=null&&!"".equals(request.getParameter("id")))
			businessPayment.setUsername(userName);
			businessPayment.setState1(0);
			businessPayment.setState2(0);
			businessPayment.setState3(0);
			iPaymentDao.save(businessPayment);
		} else {
			return "false";
		}

		return "添加成功";
	}

	/**
	 * 
	 * @param oper
	 *            操作类型 del：删除 add：增加 edit：编辑
	 * @return
	 */
	@RequiresPermissions(value = { "payment:delete", "payment:update", "payment:create" }, logical = Logical.OR)
	@RequestMapping(value = "/update/{parentid}")
	public String updateSonPayment(@RequestParam(value = "oper") String oper, @PathVariable("parentid") int parentid) { // @RequestBody
																														// 获取实体类

		Subject subject = SecurityUtils.getSubject();
		String userName = subject.getPrincipal().toString();

		if ("del".equals(oper)) {
			String[] ids = request.getParameter("id").split(",");
			for (String id : ids) {
				iPaymentDao.delete(Integer.parseInt(id));
			}

		} else if ("add".equals(oper)) {

			BusinessPayment parentBusinessPayment = iPaymentDao.findOne(parentid);

			double moneyUsed = Double.valueOf(request.getParameter("moneyUsed"))
					+ iPaymentDao.sumMoneyUsedByParent(parentid);

			double moneySum = Double.valueOf(parentBusinessPayment.getMoneySums());

			if (moneyUsed > moneySum) {
				return "添加的金额总和大于总预算指标金额";
			} else {
				BusinessPayment businessPayment = new BusinessPayment();
				businessPayment.setParent(parentid);

				businessPayment.setBudgetProject(parentBusinessPayment.getBudgetProject());
				businessPayment.setCaption(parentBusinessPayment.getCaption());
				businessPayment.setCreationTime(new Date());
				businessPayment.setExpenditureStructure(parentBusinessPayment.getExpenditureStructure());
				businessPayment.setFunctionalClass(parentBusinessPayment.getFunctionalClass());
				businessPayment.setSysDepartment(userIDao.findByUsername(userName).getSysDepartment());
				businessPayment.setMoneySums(parentBusinessPayment.getMoneySums());
				businessPayment.setMoneyUsed(Double.valueOf(request.getParameter("moneyUsed")));
				businessPayment.setMoneyUseless(parentBusinessPayment.getMoneyUseless());
				businessPayment.setOrganizationId(parentBusinessPayment.getOrganizationId());
				businessPayment.setOriginIndex(parentBusinessPayment.getOriginIndex());
				businessPayment.setUsername(userName);
				businessPayment.setState1(0);
				businessPayment.setState2(0);
				businessPayment.setState3(0);
				iPaymentDao.save(businessPayment);
			}
		} else if ("edit".equals(oper)) {
			BusinessPayment businessPayment = iPaymentDao.findOne(Integer.valueOf(request.getParameter("id")));
			// businessPayment.setId(Integer.valueOf(request.getParameter("id")));
			// float
			// moneyUsed=Float.valueOf(request.getParameter("moneyUsed"))+iPaymentDao.sumMoneyUsedByParent(parentid);
			//
			// float moneySum=Float.valueOf(businessPayment.getMoneySums());
			//
			// if(moneyUsed>moneySum){
			// return "添加的金额总和大于总预算指标金额";
			// }else{
			//
			if (request.getParameter("budgetProject") != null && !"".equals(request.getParameter("budgetProject")))
				businessPayment.setBudgetProject(request.getParameter("budgetProject"));
			if (request.getParameter("caption") != null && !"".equals(request.getParameter("caption")))
				businessPayment.setCaption(request.getParameter("caption"));
			businessPayment.setCreationTime(new Date());
			if (request.getParameter("expenditureStructure") != null
					&& !"".equals(request.getParameter("expenditureStructure")))
				businessPayment.setExpenditureStructure(request.getParameter("expenditureStructure"));
			if (request.getParameter("functionalClass") != null && !"".equals(request.getParameter("functionalClass")))
				businessPayment.setFunctionalClass(request.getParameter("functionalClass"));
			if (request.getParameter("manageDepartment") != null
					&& !"".equals(request.getParameter("manageDepartment")))
				businessPayment.setSysDepartment(userIDao.findByUsername(userName).getSysDepartment());
			if (request.getParameter("moneySums") != null && !"".equals(request.getParameter("moneySums")))
				businessPayment.setMoneySums(Double.valueOf(request.getParameter("moneySums")));
			if (request.getParameter("moneyUsed") != null && !"".equals(request.getParameter("moneyUsed"))) {

				double moneyUsed = Double.valueOf(request.getParameter("moneyUsed"))
						+ iPaymentDao.sumMoneyUsedByParent(parentid);

				double moneySum = Double.valueOf(businessPayment.getMoneySums());

				if (moneyUsed > moneySum) {
					return "添加的金额总和大于总预算指标金额";
				} else {

					businessPayment.setMoneyUsed(Double.valueOf(request.getParameter("moneyUsed")));
				}
			}
			if (request.getParameter("moneyUseless") != null && !"".equals(request.getParameter("moneyUseless")))
				businessPayment.setMoneyUseless(request.getParameter("moneyUseless"));
			if (request.getParameter("organizationId") != null && !"".equals(request.getParameter("organizationId")))
				businessPayment.setOrganizationId(request.getParameter("organizationId"));
			if (request.getParameter("originIndex") != null && !"".equals(request.getParameter("originIndex")))
				businessPayment.setOriginIndex(request.getParameter("originIndex"));
			// if(request.getParameter("id")!=null&&!"".equals(request.getParameter("id")))
			businessPayment.setUsername(userName);
			businessPayment.setState1(0);
			businessPayment.setState2(0);
			businessPayment.setState3(0);
			iPaymentDao.save(businessPayment);

			return "false";
		}

		return "操作成功";
	}

	/**
	 * 
	 * 
	 * 预算审核 审核分三种状态，0：未审核，1：审核通过，2审核未通过
	 * 
	 * @return @
	 */
	@RequiresPermissions("payment:state")
	@RequestMapping(value = "/ysstatus/{statu}", method = RequestMethod.POST)
	@ResponseBody
	public String ysAudit(@PathVariable("statu") String statu, @RequestBody int[] s) {

		int status = 0;
		if (statu == "true" || "true".equals(statu)) {
			status = 1;
		} else if (statu == "false" || "false".equals(statu)) {
			status = 2;
		}
		for (int id : s) {
			BusinessPayment businessPayment = iPaymentDao.findOne(id);
			businessPayment.setState1(status);
			iPaymentDao.save(businessPayment);
		}
		return "操作成功";
	}

	/**
	 * 
	 * 国库 审核分三种状态，0：未审核，1：审核通过，2审核未通过
	 * 
	 * @return @
	 */
	@RequiresPermissions("payment:state1")
	@RequestMapping(value = "/gkstatus/{statu}", method = RequestMethod.POST)
	@ResponseBody
	public String gkAudit(@PathVariable("statu") String statu, @RequestBody int[] s) {

		int status = 0;
		if (statu == "true" || "true".equals(statu)) {
			status = 1;
		} else if (statu == "false" || "false".equals(statu)) {
			status = 2;
		}
		for (int id : s) {
			BusinessPayment businessPayment = iPaymentDao.findOne(id);
			businessPayment.setState2(status);
			iPaymentDao.save(businessPayment);
		}
		return "操作成功";
	}

	/**
	 * 验证是否分指标总额是否大于总指标计划
	 * 
	 * @param userdmoney
	 * @return
	 */
	@RequiresPermissions("payment:view")
	@RequestMapping(value = "/checkuserdmoney/{userdmoney}", method = RequestMethod.POST)
	public Boolean checkUserdMoney(@PathVariable("userdmoney") String userdmoney) {

		BusinessPayment parentBusinessPayment = iPaymentDao.findOne(Integer.valueOf(request.getParameter("parentid")));

		double moneyUsed = Double.valueOf(userdmoney)
				+ iPaymentDao.sumMoneyUsedByParent(Integer.valueOf(request.getParameter("parentid")));

		double moneySum = Double.valueOf(parentBusinessPayment.getMoneySums());

		if (moneyUsed > moneySum) {
			return false;
		} else {

			return true;
		}
	}
	
	
	/**
	 * 导出excel
	 * @return
	 * @throws JsonParseException 
	 * @throws JsonMappingException
	 * @throws IOException
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
//	@RequiresPermissions("payment:view")
	@RequestMapping(value = "/exportexcel", method = RequestMethod.POST)
//	@ResponseBody @RequestBody String[] ids
	public String exportExcel() throws JsonParseException, JsonMappingException, IOException, IllegalAccessException, InvocationTargetException {
		String id = request.getParameter("ids");
		ObjectMapper objectMapper = new ObjectMapper();
		int[] ids = objectMapper.readValue(id, int[].class);
		
//		String[] ids= new String["11","11"];
		if(ids.length>0){
		Set set=new HashSet();
		for (int i = 0;i<ids.length;i++) {
			set.add(Integer.valueOf(ids[i]));
		}

		List<BusinessPayment> list =iPaymentDao.findAll(set);
		List<BusinessPaymentDto> dtoList =new ArrayList<BusinessPaymentDto>();
		for(BusinessPayment businessPayment:list){
			BusinessPaymentDto businessPaymentDto=new BusinessPaymentDto();
			BeanUtils.copyProperties(businessPaymentDto, businessPayment);
			dtoList.add(businessPaymentDto);
		}
		
		
		
        Map<String, String> map = new HashMap<String, String>();
        map.put("title", "预算指标");
        map.put("total", list.size()+" 条");
        map.put("date", getDate());
        LocalDate localDate=LocalDate.now();
    	int localYeas=localDate.getYear();
    	int localMonth=localDate.getMonthValue();
    	int localDay=localDate.getDayOfMonth();
        String pathName=this.makeDirs(localYeas,localMonth,localDay);
        String excelName=UUID.randomUUID().toString();
    	
        ExcelUtil.getInstance().exportObj2ExcelByTemplate(map, "payment-template.xls", new FileOutputStream(pathName+ "/" + excelName+".xls"),
        		dtoList, BusinessPaymentDto.class, true);
        
        return "/" +localYeas+"/"+localMonth+"/"+localDay+"/"+ excelName+".xls";
		}else{
			return "";
		}
		
    }

	/**
	 * 获取当前时间
	 * @return
	 */
    private String getDate() {
    	
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
        return sdf.format(new Date());
    }
	
	
	/**
	 * 判断文件夹是否存在
	 * 不存在就创建文件夹
	 */
    private String makeDirs(int localYeas,int localMonth,int localDay){
//    	LocalDate localDate=LocalDate.now();
//    	int localYeas=localDate.getYear();
//    	int localMonth=localDate.getMonthValue();
//    	int localDay=localDate.getDayOfMonth();
    	
    	File file =new File(uploadPath.replace("/", "\\"));
    	File file1 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas);
    	File file2 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas+"\\"+localMonth);
    	File file3 =new File(uploadPath.replace("/", "\\")+"\\"+localYeas+"\\"+localMonth+"\\"+localDay);
    	
    	
    	//如果文件夹不存在则创建    
    	if  (!file .exists()  && !file .isDirectory())      
    	{   
    	    file .mkdir();    
    	}
    	//如果文件夹不存在则创建    
    	if  (!file1.exists()  && !file1.isDirectory())      
    	{    
    	    file1.mkdir();    
    	}
    	
    	//如果文件夹不存在则创建    
    	if  (!file2 .exists()  && !file2.isDirectory())      
    	{    
    	    file2.mkdir();    
    	} 
    	//如果文件夹不存在则创建    
    	if  (!file3.exists()  && !file3.isDirectory())      
    	{ 
    	    file3.mkdir();    
    	} 
    	
    	
    	return uploadPath+ "/" +localYeas+ "/" +localMonth+ "/" +localDay;
    }
	

	// public Map treeJson(){
	//
	// Map<String, String> hashMap = new HashMap<String, String>();
	// hashMap.put("caption",
	// "总预算金额:"+iPaymentDao.findOne(parentid).getMoneySums());
	// hashMap.put("state1", "已申请预算总计:"+userdMoney);
	// hashMap.put("state2", "剩余预算:"+syMoney);
	//// hashMap.put("password", "123abc");
	//
	// try
	// {
	// ObjectMapper objectMapper = new ObjectMapper();
	// String userMapJson = objectMapper.writeValueAsString(hashMap);
	//
	// JsonNode node = objectMapper.readTree(userMapJson);
	// map.put("userdata",node);
	// }
	// catch (IOException e)
	// {
	// }
	// return hashMap;
	//
	//
	//
	//
	//
	// }

	// /**
	// * 验证失败返回true
	// *
	// * @param m
	// * @param result
	// * @return
	// */
	// @Override
	// protected boolean hasError(Payment m, BindingResult result) {
	// Assert.notNull(m);
	//
	// return result.hasErrors();
	// }

	/**
	 * JSON转换为Map对象
	 */
	public static List<Map<String,String>> readJson2List(String json) {
		// String
		// json="{\"groupOp\":\"AND\",\"rules\":[{\"field\":\"organizationId\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"originIndex\",\"op\":\"bw\",\"data\":\"12\"},{\"field\":\"moneySums\",\"op\":\"gt\",\"data\":\"12\"}]}";
		Map<String, List<Map<String,String>>> maps = new HashMap<String, List<Map<String,String>>>();
//		PaymentSerachBean[] arr = null;
		List<Map<String,String>> list=new ArrayList<Map<String,String>>();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			maps = objectMapper.readValue(json, Map.class);

			list = maps.get("rules");

//			arr = objectMapper.readValue(json2, PaymentSerachBean[].class);

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return list;
	}

}
