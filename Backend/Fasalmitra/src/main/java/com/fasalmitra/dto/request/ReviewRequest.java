package com.fasalmitra.dto.request;

import jakarta.validation.constraints.*;

public class ReviewRequest {

    @NotNull
    private Long productId;

    @NotNull
    @Min(1) @Max(5)
    private Integer rating;

    @Size(max = 500)
    private String comment;

    public Long getProductId()  { return productId; }
    public Integer getRating()  { return rating; }
    public String getComment()  { return comment; }

    public void setProductId(Long v)    { this.productId = v; }
    public void setRating(Integer v)    { this.rating    = v; }
    public void setComment(String v)    { this.comment   = v; }
}
