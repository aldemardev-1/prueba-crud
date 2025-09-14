package com.prueba.crud.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "API de Gestión de Productos",
        version = "1.0",
        description = "API para gestionar un catálogo de productos."
    )
)
public class OpenApiConfig {
}