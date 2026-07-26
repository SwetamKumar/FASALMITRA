package com.fasalmitra.dto.response;

import java.time.LocalDateTime;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String state;
    private String district;
    private boolean enabled;
    private LocalDateTime createdAt;

    public Long getId()                  { return id; }
    public String getName()              { return name; }
    public String getEmail()             { return email; }
    public String getPhone()             { return phone; }
    public String getRole()              { return role; }
    public String getState()             { return state; }
    public String getDistrict()          { return district; }
    public boolean isEnabled()           { return enabled; }
    public LocalDateTime getCreatedAt()  { return createdAt; }

    public void setId(Long v)                  { this.id        = v; }
    public void setName(String v)              { this.name      = v; }
    public void setEmail(String v)             { this.email     = v; }
    public void setPhone(String v)             { this.phone     = v; }
    public void setRole(String v)              { this.role      = v; }
    public void setState(String v)             { this.state     = v; }
    public void setDistrict(String v)          { this.district  = v; }
    public void setEnabled(boolean v)          { this.enabled   = v; }
    public void setCreatedAt(LocalDateTime v)  { this.createdAt = v; }
}
