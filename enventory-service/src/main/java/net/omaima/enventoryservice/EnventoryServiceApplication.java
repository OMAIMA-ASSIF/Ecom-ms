package net.omaima.enventoryservice;

import net.omaima.enventoryservice.entities.Product;
import net.omaima.enventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EnventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnventoryServiceApplication.class, args);
    }

    CommandLineRunner start(ProductRepository productRepository){
        return args -> {
            productRepository.save(Product.builder()
                    .name("Printer")
                    .price(1200)
                    .quantity(10)
                    .build());

            productRepository.save(Product.builder()
                    .name("Computer")
                    .price(34000)
                    .quantity(12)
                    .build());
        };
    }

}
