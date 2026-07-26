package com.fasalmitra.dto.response;

import java.time.LocalDateTime;

public class ReviewResponse {
    private Long id;
    private Long buyerId;
    private String buyerName;
    private Long productId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    private ReviewResponse(Builder b) {
        this.id        = b.id;
        this.buyerId   = b.buyerId;
        this.buyerName = b.buyerName;
        this.productId = b.productId;
        this.rating    = b.rating;
        this.comment   = b.comment;
        this.createdAt = b.createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id, buyerId, productId;
        private String buyerName, comment;
        private Integer rating;
        private LocalDateTime createdAt;

        public Builder id(Long v)                 { this.id        = v; return this; }
        public Builder buyerId(Long v)            { this.buyerId   = v; return this; }
        public Builder buyerName(String v)        { this.buyerName = v; return this; }
        public Builder productId(Long v)          { this.productId = v; return this; }
        public Builder rating(Integer v)          { this.rating    = v; return this; }
        public Builder comment(String v)          { this.comment   = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public ReviewResponse build()             { return new ReviewResponse(this); }
    }

    public Long getId()                 { return id; }
    public Long getBuyerId()            { return buyerId; }
    public String getBuyerName()        { return buyerName; }
    public Long getProductId()          { return productId; }
    public Integer getRating()          { return rating; }
    public String getComment()          { return comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
