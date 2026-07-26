package com.fasalmitra.dto.request;

import com.fasalmitra.entity.OrderStatus;
import jakarta.validation.constraints.*;

public class OrderRequest {

    public static class PlaceOrder {
        @NotNull
        private Long productId;

        @NotNull
        private Double quantity;

        @NotBlank
        private String deliveryAddress;

        public Long getProductId()         { return productId; }
        public Double getQuantity()        { return quantity; }
        public String getDeliveryAddress() { return deliveryAddress; }

        public void setProductId(Long v)          { this.productId       = v; }
        public void setQuantity(Double v)         { this.quantity        = v; }
        public void setDeliveryAddress(String v)  { this.deliveryAddress = v; }
    }

    public static class UpdateStatus {
        @NotNull
        private OrderStatus status;

        private String cancelReason;

        public OrderStatus getStatus()      { return status; }
        public String getCancelReason()     { return cancelReason; }

        public void setStatus(OrderStatus v)     { this.status       = v; }
        public void setCancelReason(String v)    { this.cancelReason = v; }
    }
}
