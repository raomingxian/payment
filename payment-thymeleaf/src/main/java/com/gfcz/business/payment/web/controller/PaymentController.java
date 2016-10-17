package com.gfcz.business.payment.web.controller;


import java.util.ArrayList;
import java.util.List;



import org.springframework.web.bind.annotation.RequestMapping;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(value = "/business/payment")
public class PaymentController {

    private static final Logger LOG = Logger.getLogger(PaymentController.class.getName());
   
    @RequestMapping("/")
    public String PaymentIndex(){
    	return "payment";
    }




    @RequestMapping(value = "status/{status}", method = RequestMethod.GET)
    public String audit(
            HttpServletRequest request,
            @RequestParam("ids") Integer[] ids,
            @PathVariable("status") Integer status,
            @RequestParam(value = "comment", required = false) String comment,
            RedirectAttributes redirectAttributes
    ) {

//        this.permissionList.assertHasPermission("audit");

//        List<Payment> paymentList = new ArrayList<Payment>();
        for (Integer id : ids) {
//            Payment payment = getPaymentService().findOne(id);
//            if (payment.getState1() != Stateable.AuditStatus.waiting) {
//                redirectAttributes.addFlashAttribute(Constants.ERROR, "数据中有已通过审核的，不能重复审核！");
//                return "redirect:" + request.getAttribute(Constants.BACK_URL);
//            }
//            paymentList.add(payment);
            
//            payment.setState1(status);
//            getPaymentService().update(payment);
        }
//        for (Payment payment : paymentList) {
//            //            payment.setComment(comment);
//            payment.setState1(status);
//            getPaymentService().update(payment);
//        }

//        redirectAttributes.addFlashAttribute(Constants.MESSAGE, "操作成功！");

//        return "redirect:" + request.getAttribute(Constants.BACK_URL);
          return  "";
    }

//    /**
//     * 验证失败返回true
//     *
//     * @param m
//     * @param result
//     * @return
//     */
//    @Override
//    protected boolean hasError(Payment m, BindingResult result) {
//        Assert.notNull(m);
//
//        return result.hasErrors();
//    }

    
    
    
	

}
