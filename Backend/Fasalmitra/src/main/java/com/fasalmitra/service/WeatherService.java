package com.fasalmitra.service;

import com.fasalmitra.entity.WeatherCache;
import com.fasalmitra.repository.WeatherCacheRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class WeatherService {

    private static final Logger log = LoggerFactory.getLogger(WeatherService.class);

    private final WeatherCacheRepository weatherCacheRepository;
    private final RestTemplate restTemplate;

    @Value("${app.weather.api-key}")
    private String apiKey;

    @Value("${app.weather.base-url}")
    private String baseUrl;

    @Value("${app.weather.cache-ttl-hours}")
    private int cacheTtlHours;

    public WeatherService(WeatherCacheRepository weatherCacheRepository,
                          RestTemplate restTemplate) {
        this.weatherCacheRepository = weatherCacheRepository;
        this.restTemplate           = restTemplate;
    }

    public String getWeather(String district, String state) {
        String locationKey = district + "," + state;
        return weatherCacheRepository.findByLocation(locationKey)
                .filter(cache -> !cache.isExpired())
                .map(WeatherCache::getWeatherJson)
                .orElseGet(() -> fetchAndCache(locationKey, district + "," + state + ",IN"));
    }

    private String fetchAndCache(String locationKey, String query) {
        try {
            String url = baseUrl + "/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
            String weatherJson = restTemplate.getForObject(url, String.class);

            WeatherCache cache = weatherCacheRepository.findByLocation(locationKey)
                    .orElse(new WeatherCache());
            cache.setLocation(locationKey);
            cache.setWeatherJson(weatherJson);
            cache.setCachedAt(LocalDateTime.now());
            cache.setExpiresAt(LocalDateTime.now().plusHours(cacheTtlHours));
            weatherCacheRepository.save(cache);
            return weatherJson;
        } catch (Exception e) {
            log.error("Failed to fetch weather for {}: {}", query, e.getMessage());
            return "{\"error\": \"Weather data unavailable\"}";
        }
    }

    @Scheduled(fixedRate = 6 * 60 * 60 * 1000)
    public void cleanExpiredCache() {
        log.info("Cleaning expired weather cache entries...");
        weatherCacheRepository.findAll().stream()
                .filter(WeatherCache::isExpired)
                .forEach(weatherCacheRepository::delete);
    }
}
