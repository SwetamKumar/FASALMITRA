package com.fasalmitra.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews",
       uniqueConstraints = @UniqueConstraint(columnNames = {"buyer_id", "product_id"}))
public class Review {

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
    private Integer rating;

    @Column(length = 500)
    private String comment;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    // ── Constructors ──────────────────────────────────────────
    public Review() {}

    private Review(Builder b) {
        this.buyer   = b.buyer;
        this.product = b.product;
        this.rating  = b.rating;
        this.comment = b.comment;
    }

    // ── Builder ───────────────────────────────────────────────
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private User buyer;
        private Product product;
        private Integer rating;
        private String comment;

        public Builder buyer(User v)      { this.buyer   = v; return this; }
        public Builder product(Product v) { this.product = v; return this; }
        public Builder rating(Integer v)  { this.rating  = v; return this; }
        public Builder comment(String v)  { this.comment = v; return this; }

        public Review build() { return new Review(this); }
    }

    // ── Lifecycle ─────────────────────────────────────────────
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // ── Getters ───────────────────────────────────────────────
    public Long getId()                 { return id; }
    public User getBuyer()              { return buyer; }
    public Product getProduct()         { return product; }
    public Integer getRating()          { return rating; }
    public String getComment()          { return comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
