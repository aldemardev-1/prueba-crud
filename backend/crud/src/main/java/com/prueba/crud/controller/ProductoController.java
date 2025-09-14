package com.prueba.crud.controller;

import com.prueba.crud.model.Producto;
import com.prueba.crud.repository.ProductoRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public Producto crearProducto(@Valid @RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping
    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        return producto.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @Valid @RequestBody Producto detallesProducto) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(detallesProducto.getNombre());
                    producto.setDescripcion(detallesProducto.getDescripcion());
                    producto.setPrecio(detallesProducto.getPrecio());
                    producto.setCantidadEnStock(detallesProducto.getCantidadEnStock());
                    Producto productoActualizado = productoRepository.save(producto);
                    return ResponseEntity.ok(productoActualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        return productoRepository.findById(id)
                .map(producto -> {
                    productoRepository.delete(producto);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/inventario/valor-total")
    public BigDecimal calcularValorTotalInventario() {
        return productoRepository.findAll().stream()
                .map(p -> p.getPrecio().multiply(BigDecimal.valueOf(p.getCantidadEnStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @GetMapping("/combinaciones")
    public List<List<Object>> encontrarCombinaciones(@RequestParam BigDecimal valor) {
        List<Producto> productos = productoRepository.findAll();
        List<List<Object>> combinaciones = new ArrayList<>();

        for (int i = 0; i < productos.size(); i++) {
            for (int j = i + 1; j < productos.size(); j++) {
                Producto p1 = productos.get(i);
                Producto p2 = productos.get(j);
                BigDecimal suma = p1.getPrecio().add(p2.getPrecio());
                if (suma.compareTo(valor) <= 0) {
                    combinaciones.add(List.of(p1.getNombre(), p2.getNombre(), suma));
                }
            }
        }

        for (int i = 0; i < productos.size(); i++) {
            for (int j = i + 1; j < productos.size(); j++) {
                for (int k = j + 1; k < productos.size(); k++) {
                    Producto p1 = productos.get(i);
                    Producto p2 = productos.get(j);
                    Producto p3 = productos.get(k);
                    BigDecimal suma = p1.getPrecio().add(p2.getPrecio()).add(p3.getPrecio());
                    if (suma.compareTo(valor) <= 0) {
                        combinaciones.add(List.of(p1.getNombre(), p2.getNombre(), p3.getNombre(), suma));
                    }
                }
            }
        }

        Collections.sort(combinaciones, (c1, c2) -> {
            BigDecimal suma1 = (BigDecimal) c1.get(c1.size() - 1);
            BigDecimal suma2 = (BigDecimal) c2.get(c2.size() - 1);
            return suma2.compareTo(suma1);
        });

        return combinaciones.stream().limit(5).collect(Collectors.toList());
    }
}