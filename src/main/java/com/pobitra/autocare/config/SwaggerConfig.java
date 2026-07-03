package com.pobitra.autocare.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("AutoCare Management System API")
                        .version("1.0")
                        .description("REST APIs for AutoCare Management System")
                        .contact(new Contact()
                                .name("Pobitra Paria")
                                .email("pobitraparia@gmail.com")));
    }
}
