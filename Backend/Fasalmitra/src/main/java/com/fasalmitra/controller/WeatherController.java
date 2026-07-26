package com.fasalmitra.controller;

import com.fasalmitra.dto.response.ApiResponse;
import com.fasalmitra.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<String>> getWeather(
            @RequestParam String district,
            @RequestParam String state) {
        return ResponseEntity.ok(
            ApiResponse.success(weatherService.getWeather(district, state)));
    }
}
