package com.fasalmitra.dto.response;

import com.fasalmitra.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderResponse {
    private Long id;
    private Long buyerId;
    private String buyerName;
    private Long productId;
    private String productName;
    private String farmerName;
    private Double quantity;
    private String unit;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private String deliveryAddress;
    private String cancelReason;
    private LocalDateTime orderedAt;
    private LocalDateTime updatedAt;

    private OrderResponse(Builder b) {
        this.id              = b.id;
        this.buyerId         = b.buyerId;
        this.buyerName       = b.buyerName;
        this.productId       = b.productId;
        this.productName     = b.productName;
        this.farmerName      = b.farmerName;
        this.quantity        = b.quantity;
        this.unit            = b.unit;
        this.totalPrice      = b.totalPrice;
        this.status          = b.status;
        this.deliveryAddress = b.deliveryAddress;
        this.cancelReason    = b.cancelReason;
        this.orderedAt       = b.orderedAt;
        this.updatedAt       = b.updatedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id, buyerId, productId;
        private String buyerName, productName, farmerName, unit, deliveryAddress, cancelReason;
        private Double quantity;
        private BigDecimal totalPrice;
        private OrderStatus status;
        private LocalDateTime orderedAt, updatedAt;

        public Builder id(Long v)                   { this.id              = v; return this; }
        public Builder buyerId(Long v)              { this.buyerId         = v; return this; }
        public Builder buyerName(String v)          { this.buyerName       = v; return this; }
        public Builder productId(Long v)            { this.productId       = v; return this; }
        public Builder productName(String v)        { this.productName     = v; return this; }
        public Builder farmerName(String v)         { this.farmerName      = v; return this; }
        public Builder quantity(Double v)           { this.quantity        = v; return this; }
        public Builder unit(String v)               { this.unit            = v; return this; }
        public Builder totalPrice(BigDecimal v)     { this.totalPrice      = v; return this; }
        public Builder status(OrderStatus v)        { this.status          = v; return this; }
        public Builder deliveryAddress(String v)    { this.deliveryAddress = v; return this; }
        public Builder cancelReason(String v)       { this.cancelReason    = v; return this; }
        public Builder orderedAt(LocalDateTime v)   { this.orderedAt       = v; return this; }
        public Builder updatedAt(LocalDateTime v)   { this.updatedAt       = v; return this; }
        public OrderResponse build()                { return new OrderResponse(this); }
    }

    public Long getId()                  { return id; }
    public Long getBuyerId()             { return buyerId; }
    public String getBuyerName()         { return buyerName; }
    public Long getProductId()           { return productId; }
    public String getProductName()       { return productName; }
    public String getFarmerName()        { return farmerName; }
    public Double getQuantity()          { return quantity; }
    public String getUnit()              { return unit; }
    public BigDecimal getTotalPrice()    { return totalPrice; }
    public OrderStatus getStatus()       { return status; }
    public String getDeliveryAddress()   { return deliveryAddress; }
    public String getCancelReason()      { return cancelReason; }
    public LocalDateTime getOrderedAt()  { return orderedAt; }
    public LocalDateTime getUpdatedAt()  { return updatedAt; }
}
