package com.fasalmitra.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal pricePerUnit;

    @NotBlank(message = "Unit is required")
    private String unit;

    @NotNull(message = "Quantity is required")
    private Double quantityAvailable;

    private String category;
    private String imageUrl;

    public String getName()              { return name; }
    public String getDescription()       { return description; }
    public BigDecimal getPricePerUnit()  { return pricePerUnit; }
    public String getUnit()              { return unit; }
    public Double getQuantityAvailable() { return quantityAvailable; }
    public String getCategory()          { return category; }
    public String getImageUrl()          { return imageUrl; }

    public void setName(String v)                { this.name              = v; }
    public void setDescription(String v)         { this.description       = v; }
    public void setPricePerUnit(BigDecimal v)    { this.pricePerUnit      = v; }
    public void setUnit(String v)                { this.unit              = v; }
    public void setQuantityAvailable(Double v)   { this.quantityAvailable = v; }
    public void setCategory(String v)            { this.category          = v; }
    public void setImageUrl(String v)            { this.imageUrl          = v; }
}
