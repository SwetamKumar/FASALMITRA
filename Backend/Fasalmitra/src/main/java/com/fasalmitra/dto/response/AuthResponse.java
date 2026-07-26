package com.fasalmitra.dto.response;

import com.fasalmitra.entity.Role;

public class AuthResponse {
    private String token;
    private String tokenType;
    private Long userId;
    private String name;
    private String email;
    private Role role;

    private AuthResponse(Builder b) {
        this.token     = b.token;
        this.tokenType = b.tokenType;
        this.userId    = b.userId;
        this.name      = b.name;
        this.email     = b.email;
        this.role      = b.role;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String token, tokenType, name, email;
        private Long userId;
        private Role role;

        public Builder token(String v)     { this.token     = v; return this; }
        public Builder tokenType(String v) { this.tokenType = v; return this; }
        public Builder userId(Long v)      { this.userId    = v; return this; }
        public Builder name(String v)      { this.name      = v; return this; }
        public Builder email(String v)     { this.email     = v; return this; }
        public Builder role(Role v)        { this.role      = v; return this; }
        public AuthResponse build()        { return new AuthResponse(this); }
    }

    public String getToken()     { return token; }
    public String getTokenType() { return tokenType; }
    public Long getUserId()      { return userId; }
    public String getName()      { return name; }
    public String getEmail()     { return email; }
    public Role getRole()        { return role; }
}
