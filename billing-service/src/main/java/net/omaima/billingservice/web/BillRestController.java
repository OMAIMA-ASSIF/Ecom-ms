package net.omaima.billingservice.web;

import net.omaima.billingservice.entities.Bill;
import net.omaima.billingservice.feign.CustomerServiceRestClient;
import net.omaima.billingservice.feign.InventoryServiceRestClient;
import net.omaima.billingservice.model.Customer;
import net.omaima.billingservice.repository.BillRepository;
import net.omaima.billingservice.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BillRestController {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductItemRepository productItemRepository;
    @Autowired
    private CustomerServiceRestClient customerServiceRestClient;
    @Autowired
    private InventoryServiceRestClient inventoryServiceRestClient;

    @GetMapping("/bills/{id}")
    public Bill getBillById(@PathVariable Long id){
        Bill bill = billRepository.findById(id).get();
        Customer customer = customerServiceRestClient.findCustomerById(bill.getCustomerId());
        bill.setCustomer(customer);

        return bill;
    }


}
