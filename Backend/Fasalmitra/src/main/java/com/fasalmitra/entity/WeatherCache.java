package com.fasalmitra.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_cache")
public class WeatherCache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String location;

    @Column(nullable = false, length = 3000)
    private String weatherJson;

    @Column(nullable = false)
    private LocalDateTime cachedAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    public WeatherCache() {}

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

    public Long getId()                  { return id; }
    public String getLocation()          { return location; }
    public String getWeatherJson()       { return weatherJson; }
    public LocalDateTime getCachedAt()   { return cachedAt; }
    public LocalDateTime getExpiresAt()  { return expiresAt; }

    public void setLocation(String v)          { this.location    = v; }
    public void setWeatherJson(String v)       { this.weatherJson = v; }
    public void setCachedAt(LocalDateTime v)   { this.cachedAt    = v; }
    public void setExpiresAt(LocalDateTime v)  { this.expiresAt   = v; }
}
