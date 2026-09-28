package net.omaima.billingservice.feign;

import net.omaima.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="inventory-service")
public interface InventoryServiceRestClient {
    @GetMapping("/products/{id}")
    Product getProduct(@PathVariable Long id);
}
