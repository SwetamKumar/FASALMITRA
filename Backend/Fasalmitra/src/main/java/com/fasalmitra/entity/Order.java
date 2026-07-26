package com.fasalmitra.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    private String deliveryAddress;
    private String cancelReason;

    @Column(updatable = false)
    private LocalDateTime orderedAt;
    private LocalDateTime updatedAt;

    // ── Constructors ──────────────────────────────────────────
    public Order() {}

    private Order(Builder b) {
        this.buyer           = b.buyer;
        this.product         = b.product;
        this.quantity        = b.quantity;
        this.totalPrice      = b.totalPrice;
        this.status          = b.status;
        this.deliveryAddress = b.deliveryAddress;
    }

    // ── Builder ───────────────────────────────────────────────
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private User buyer;
        private Product product;
        private Double quantity;
        private BigDecimal totalPrice;
        private OrderStatus status;
        private String deliveryAddress;

        public Builder buyer(User v)                { this.buyer           = v; return this; }
        public Builder product(Product v)           { this.product         = v; return this; }
        public Builder quantity(Double v)           { this.quantity        = v; return this; }
        public Builder totalPrice(BigDecimal v)     { this.totalPrice      = v; return this; }
        public Builder status(OrderStatus v)        { this.status          = v; return this; }
        public Builder deliveryAddress(String v)    { this.deliveryAddress = v; return this; }

        public Order build() { return new Order(this); }
    }

    // ── Lifecycle ─────────────────────────────────────────────
    @PrePersist
    protected void onCreate() {
        orderedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = OrderStatus.PLACED;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ── Getters & Setters ─────────────────────────────────────
    public Long getId()                  { return id; }
    public User getBuyer()               { return buyer; }
    public Product getProduct()          { return product; }
    public Double getQuantity()          { return quantity; }
    public BigDecimal getTotalPrice()    { return totalPrice; }
    public OrderStatus getStatus()       { return status; }
    public String getDeliveryAddress()   { return deliveryAddress; }
    public String getCancelReason()      { return cancelReason; }
    public LocalDateTime getOrderedAt()  { return orderedAt; }
    public LocalDateTime getUpdatedAt()  { return updatedAt; }

    public void setStatus(OrderStatus v)        { this.status          = v; }
    public void setCancelReason(String v)       { this.cancelReason    = v; }
    public void setDeliveryAddress(String v)    { this.deliveryAddress = v; }
}
