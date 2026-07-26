package com.fasalmitra.repository;

import com.fasalmitra.entity.WeatherCache;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface WeatherCacheRepository extends JpaRepository<WeatherCache, Long> {
    Optional<WeatherCache> findByLocation(String location);
}
