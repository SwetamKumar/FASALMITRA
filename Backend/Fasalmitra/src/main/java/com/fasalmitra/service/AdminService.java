package com.fasalmitra.service;

import com.fasalmitra.dto.response.OrderResponse;
import com.fasalmitra.dto.response.UserResponse;
import com.fasalmitra.entity.Order;
import com.fasalmitra.entity.User;
import com.fasalmitra.exception.ResourceNotFoundException;
import com.fasalmitra.repository.OrderRepository;
import com.fasalmitra.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminService(UserRepository userRepository,
                        OrderRepository orderRepository) {
        this.userRepository  = userRepository;
        this.orderRepository = orderRepository;
    }

    // ── Users ─────────────────────────────────────────────────

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream().map(this::toUserResponse).collect(Collectors.toList());
    }

    public UserResponse toggleUserEnabled(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEnabled(!user.isEnabled());
        return toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    // ── Orders ────────────────────────────────────────────────

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream().map(this::toOrderResponse).collect(Collectors.toList());
    }

    // ── Stats ─────────────────────────────────────────────────

    public AdminStatsResponse getStats() {
        long totalUsers   = userRepository.count();
        long totalOrders  = orderRepository.count();
        long farmers      = userRepository.countByRole(com.fasalmitra.entity.Role.ROLE_FARMER);
        long buyers       = userRepository.countByRole(com.fasalmitra.entity.Role.ROLE_BUYER);

        AdminStatsResponse stats = new AdminStatsResponse();
        stats.setTotalUsers(totalUsers);
        stats.setTotalOrders(totalOrders);
        stats.setTotalFarmers(farmers);
        stats.setTotalBuyers(buyers);
        return stats;
    }

    // ── Mappers ───────────────────────────────────────────────

    private UserResponse toUserResponse(User u) {
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setName(u.getName());
        r.setEmail(u.getEmail());
        r.setPhone(u.getPhone());
        r.setRole(u.getRole().name());
        r.setState(u.getState());
        r.setDistrict(u.getDistrict());
        r.setEnabled(u.isEnabled());
        r.setCreatedAt(u.getCreatedAt());
        return r;
    }

    private OrderResponse toOrderResponse(Order o) {
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

    // ── Inner DTOs ────────────────────────────────────────────

    public static class AdminStatsResponse {
        private long totalUsers;
        private long totalOrders;
        private long totalFarmers;
        private long totalBuyers;

        public long getTotalUsers()   { return totalUsers; }
        public long getTotalOrders()  { return totalOrders; }
        public long getTotalFarmers() { return totalFarmers; }
        public long getTotalBuyers()  { return totalBuyers; }

        public void setTotalUsers(long v)   { this.totalUsers   = v; }
        public void setTotalOrders(long v)  { this.totalOrders  = v; }
        public void setTotalFarmers(long v) { this.totalFarmers = v; }
        public void setTotalBuyers(long v)  { this.totalBuyers  = v; }
    }
}
