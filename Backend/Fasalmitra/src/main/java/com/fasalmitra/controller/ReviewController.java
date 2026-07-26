package com.fasalmitra.controller;

import com.fasalmitra.dto.request.ReviewRequest;
import com.fasalmitra.dto.response.ApiResponse;
import com.fasalmitra.dto.response.ReviewResponse;
import com.fasalmitra.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_BUYER')")
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(
            @Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(
            ApiResponse.success("Review submitted", reviewService.addReview(request)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getProductReviews(
            @PathVariable Long productId) {
        return ResponseEntity.ok(
            ApiResponse.success(reviewService.getProductReviews(productId)));
    }
}
