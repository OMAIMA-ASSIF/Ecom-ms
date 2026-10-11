package net.omaima.customerservice;

import net.omaima.customerservice.config.CustomerConfigParams;
import net.omaima.customerservice.entities.Customer;
import net.omaima.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository){
        return args -> {
            customerRepository.save(Customer.builder().name("Mohamed").email("med@gmail.com").build());
            customerRepository.save(Customer.builder().name("Ahmed").email("ahmed@gmail.com").build());
            customerRepository.save(Customer.builder().name("Omaima").email("omaima@gmail.com").build());
        };
    }
}