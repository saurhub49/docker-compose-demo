package com.docker.dockercomposedemo.repositories;

import com.docker.dockercomposedemo.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
