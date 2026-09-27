package net.omaima.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

    //Autre methode pour configurer les routes (equiv a prop..yml)
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder){
        return builder.routes()
                .route("r1", predicates -> predicates.path("/customers/**").uri("lb://CUSTOMER-SERVICE"))
                .route("r2", predicates -> predicates.path("/products/**").uri("lb://ENVENTORY-SERVICE")).build();
    }
}
