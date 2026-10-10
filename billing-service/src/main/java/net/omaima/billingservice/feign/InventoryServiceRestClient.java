package net.omaima.billingservice.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import net.omaima.billingservice.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="enventory-service")
public interface InventoryServiceRestClient {
    @GetMapping("/products/{id}")
    @CircuitBreaker(name="enventory-service", fallbackMethod = "getDefaultProduct")
    Product getProduct(@PathVariable Long id);

    default Product getDefaultProduct(Long id){
        return new Product().builder().id(id).build();
    }

}
