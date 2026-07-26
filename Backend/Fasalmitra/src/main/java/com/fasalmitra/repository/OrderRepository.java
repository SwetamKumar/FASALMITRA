package com.fasalmitra.repository;

import com.fasalmitra.entity.Order;

import com.fasalmitra.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByBuyerIdOrderByOrderedAtDesc(Long buyerId);
    List<Order> findByProductFarmerIdOrderByOrderedAtDesc(Long farmerId);
    List<Order> findByProductFarmerIdAndStatus(Long farmerId, OrderStatus status);
}
