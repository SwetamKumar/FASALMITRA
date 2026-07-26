package com.fasalmitra.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal pricePerUnit;
    private String unit;
    private Double quantityAvailable;
    private String category;
    private String imageUrl;
    private boolean available;
    private Long farmerId;
    private String farmerName;
    private String farmerDistrict;
    private String farmerState;
    private Double averageRating;
    private LocalDateTime createdAt;

    private ProductResponse(Builder b) {
        this.id                = b.id;
        this.name              = b.name;
        this.description       = b.description;
        this.pricePerUnit      = b.pricePerUnit;
        this.unit              = b.unit;
        this.quantityAvailable = b.quantityAvailable;
        this.category          = b.category;
        this.imageUrl          = b.imageUrl;
        this.available         = b.available;
        this.farmerId          = b.farmerId;
        this.farmerName        = b.farmerName;
        this.farmerDistrict    = b.farmerDistrict;
        this.farmerState       = b.farmerState;
        this.averageRating     = b.averageRating;
        this.createdAt         = b.createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id, farmerId;
        private String name, description, unit, category, imageUrl, farmerName, farmerDistrict, farmerState;
        private BigDecimal pricePerUnit;
        private Double quantityAvailable, averageRating;
        private boolean available;
        private LocalDateTime createdAt;

        public Builder id(Long v)                    { this.id                = v; return this; }
        public Builder name(String v)                { this.name              = v; return this; }
        public Builder description(String v)         { this.description       = v; return this; }
        public Builder pricePerUnit(BigDecimal v)    { this.pricePerUnit      = v; return this; }
        public Builder unit(String v)                { this.unit              = v; return this; }
        public Builder quantityAvailable(Double v)   { this.quantityAvailable = v; return this; }
        public Builder category(String v)            { this.category          = v; return this; }
        public Builder imageUrl(String v)            { this.imageUrl          = v; return this; }
        public Builder available(boolean v)          { this.available         = v; return this; }
        public Builder farmerId(Long v)              { this.farmerId          = v; return this; }
        public Builder farmerName(String v)          { this.farmerName        = v; return this; }
        public Builder farmerDistrict(String v)      { this.farmerDistrict    = v; return this; }
        public Builder farmerState(String v)         { this.farmerState       = v; return this; }
        public Builder averageRating(Double v)       { this.averageRating     = v; return this; }
        public Builder createdAt(LocalDateTime v)    { this.createdAt         = v; return this; }
        public ProductResponse build()               { return new ProductResponse(this); }
    }

    public Long getId()                  { return id; }
    public String getName()              { return name; }
    public String getDescription()       { return description; }
    public BigDecimal getPricePerUnit()  { return pricePerUnit; }
    public String getUnit()              { return unit; }
    public Double getQuantityAvailable() { return quantityAvailable; }
    public String getCategory()          { return category; }
    public String getImageUrl()          { return imageUrl; }
    public boolean isAvailable()         { return available; }
    public Long getFarmerId()            { return farmerId; }
    public String getFarmerName()        { return farmerName; }
    public String getFarmerDistrict()    { return farmerDistrict; }
    public String getFarmerState()       { return farmerState; }
    public Double getAverageRating()     { return averageRating; }
    public LocalDateTime getCreatedAt()  { return createdAt; }
}
