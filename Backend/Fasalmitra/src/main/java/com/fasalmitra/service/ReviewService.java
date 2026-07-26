package com.fasalmitra.service;

import com.fasalmitra.dto.request.ReviewRequest;
import com.fasalmitra.dto.response.ReviewResponse;
import com.fasalmitra.entity.Product;
import com.fasalmitra.entity.Review;
import com.fasalmitra.entity.User;
import com.fasalmitra.exception.BadRequestException;
import com.fasalmitra.exception.ResourceNotFoundException;
import com.fasalmitra.repository.ProductRepository;
import com.fasalmitra.repository.ReviewRepository;
import com.fasalmitra.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         ProductRepository productRepository,
                         UserRepository userRepository) {
        this.reviewRepository  = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository    = userRepository;
    }

    public ReviewResponse addReview(ReviewRequest request) {
        User buyer = getCurrentUser();
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (reviewRepository.existsByBuyerIdAndProductId(buyer.getId(), product.getId())) {
            throw new BadRequestException("You have already reviewed this product");
        }

        Review review = Review.builder()
                .buyer(buyer)
                .product(product)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return toResponse(reviewRepository.save(review));
    }

    public List<ReviewResponse> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ReviewResponse toResponse(Review r) {
        return ReviewResponse.builder()
                .id(r.getId())
                .buyerId(r.getBuyer().getId())
                .buyerName(r.getBuyer().getName())
                .productId(r.getProduct().getId())
                .rating(r.getRating())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt())
                .build();
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
