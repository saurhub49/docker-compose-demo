package com.docker.dockercomposedemo.services;

import com.docker.dockercomposedemo.dtos.RequestProductDTO;
import com.docker.dockercomposedemo.dtos.ResponseProductDTO;
import com.docker.dockercomposedemo.entities.Product;
import com.docker.dockercomposedemo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ResponseProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ResponseProductDTO getProductById(Long id) {
        Optional<Product> result = productRepository.findById(id);
        return result.map(this::convertToDto).orElse(null);

    }

    public ResponseProductDTO saveProduct(RequestProductDTO product) {
        return convertToDto(productRepository.save(convertToEntity(product)));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ResponseProductDTO convertToDto(Product entity) {
        return new ResponseProductDTO(entity.getId(), entity.getName(), entity.getPrice());
    }

    private Product convertToEntity(RequestProductDTO dto) {
        return new Product(dto.name(), dto.price());
    }
}
