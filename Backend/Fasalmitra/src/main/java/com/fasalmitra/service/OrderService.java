package com.fasalmitra.service;

import com.fasalmitra.dto.request.OrderRequest;
import com.fasalmitra.dto.response.OrderResponse;
import com.fasalmitra.entity.*;
import com.fasalmitra.exception.BadRequestException;
import com.fasalmitra.exception.ResourceNotFoundException;
import com.fasalmitra.repository.OrderRepository;
import com.fasalmitra.repository.ProductRepository;
import com.fasalmitra.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository) {
        this.orderRepository   = orderRepository;
        this.productRepository = productRepository;
        this.userRepository    = userRepository;
    }

    @Transactional
    public OrderResponse placeOrder(OrderRequest.PlaceOrder request) {
        User buyer = getCurrentUser();
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.isAvailable()) {
            throw new BadRequestException("Product is not available");
        }
        if (product.getQuantityAvailable() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock. Available: "
                    + product.getQuantityAvailable() + " " + product.getUnit());
        }

        BigDecimal totalPrice = product.getPricePerUnit()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        product.setQuantityAvailable(product.getQuantityAvailable() - request.getQuantity());
        if (product.getQuantityAvailable() == 0) product.setAvailable(false);
        productRepository.save(product);

        Order order = Order.builder()
                .buyer(buyer)
                .product(product)
                .quantity(request.getQuantity())
                .totalPrice(totalPrice)
                .deliveryAddress(request.getDeliveryAddress())
                .status(OrderStatus.PLACED)
                .build();

        return toResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getMyOrdersAsBuyer() {
        User buyer = getCurrentUser();
        return orderRepository.findByBuyerIdOrderByOrderedAtDesc(buyer.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OrderResponse> getOrdersForMyProducts() {
        User farmer = getCurrentUser();
        return orderRepository.findByProductFarmerIdOrderByOrderedAtDesc(farmer.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderRequest.UpdateStatus request) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        boolean isFarmer = order.getProduct().getFarmer().getId().equals(user.getId());
        boolean isBuyer  = order.getBuyer().getId().equals(user.getId());

        if (!isFarmer && !isBuyer) {
            throw new BadRequestException("Not authorized to update this order");
        }
        if (isBuyer && request.getStatus() != OrderStatus.CANCELLED) {
            throw new BadRequestException("Buyers can only cancel orders");
        }
        if (order.getStatus() == OrderStatus.DELIVERED
                || order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Cannot update a " + order.getStatus() + " order");
        }

        order.setStatus(request.getStatus());
        if (request.getCancelReason() != null) {
            order.setCancelReason(request.getCancelReason());
        }
        return toResponse(orderRepository.save(order));
    }

    private OrderResponse toResponse(Order o) {
        return OrderResponse.builder()
                .id(o.getId())
                .buyerId(o.getBuyer().getId())
                .buyerName(o.getBuyer().getName())
                .productId(o.getProduct().getId())
                .productName(o.getProduct().getName())
                .farmerName(o.getProduct().getFarmer().getName())
                .quantity(o.getQuantity())
                .unit(o.getProduct().getUnit())
                .totalPrice(o.getTotalPrice())
                .status(o.getStatus())
                .deliveryAddress(o.getDeliveryAddress())
                .cancelReason(o.getCancelReason())
                .orderedAt(o.getOrderedAt())
                .updatedAt(o.getUpdatedAt())
                .build();
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
