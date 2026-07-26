package com.fasalmitra.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private Double quantityAvailable;

    private String category;
    private String imageUrl;
    private boolean available = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ── Constructors ──────────────────────────────────────────
    public Product() {}

    private Product(Builder b) {
        this.name              = b.name;
        this.description       = b.description;
        this.pricePerUnit      = b.pricePerUnit;
        this.unit              = b.unit;
        this.quantityAvailable = b.quantityAvailable;
        this.category          = b.category;
        this.imageUrl          = b.imageUrl;
        this.available         = b.available;
        this.farmer            = b.farmer;
    }

    // ── Builder ───────────────────────────────────────────────
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name, description, unit, category, imageUrl;
        private BigDecimal pricePerUnit;
        private Double quantityAvailable;
        private boolean available = true;
        private User farmer;

        public Builder name(String v)              { this.name              = v; return this; }
        public Builder description(String v)       { this.description       = v; return this; }
        public Builder pricePerUnit(BigDecimal v)  { this.pricePerUnit      = v; return this; }
        public Builder unit(String v)              { this.unit              = v; return this; }
        public Builder quantityAvailable(Double v) { this.quantityAvailable = v; return this; }
        public Builder category(String v)          { this.category          = v; return this; }
        public Builder imageUrl(String v)          { this.imageUrl          = v; return this; }
        public Builder available(boolean v)        { this.available         = v; return this; }
        public Builder farmer(User v)              { this.farmer            = v; return this; }

        public Product build() { return new Product(this); }
    }

    // ── Lifecycle ─────────────────────────────────────────────
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ── Getters & Setters ─────────────────────────────────────
    public Long getId()                  { return id; }
    public String getName()              { return name; }
    public String getDescription()       { return description; }
    public BigDecimal getPricePerUnit()  { return pricePerUnit; }
    public String getUnit()              { return unit; }
    public Double getQuantityAvailable() { return quantityAvailable; }
    public String getCategory()          { return category; }
    public String getImageUrl()          { return imageUrl; }
    public boolean isAvailable()         { return available; }
    public User getFarmer()              { return farmer; }
    public LocalDateTime getCreatedAt()  { return createdAt; }
    public LocalDateTime getUpdatedAt()  { return updatedAt; }

    public void setName(String v)                  { this.name              = v; }
    public void setDescription(String v)           { this.description       = v; }
    public void setPricePerUnit(BigDecimal v)      { this.pricePerUnit      = v; }
    public void setUnit(String v)                  { this.unit              = v; }
    public void setQuantityAvailable(Double v)     { this.quantityAvailable = v; }
    public void setCategory(String v)              { this.category          = v; }
    public void setImageUrl(String v)              { this.imageUrl          = v; }
    public void setAvailable(boolean v)            { this.available         = v; }
    public void setFarmer(User v)                  { this.farmer            = v; }
}
