package com.fasalmitra.dto.request;

import com.fasalmitra.entity.Role;
import jakarta.validation.constraints.*;

public class AuthRequest {

    public static class Register {
        @NotBlank(message = "Name is required")
        private String name;

        @Email(message = "Valid email is required")
        @NotBlank
        private String email;

        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Phone is required")
        private String phone;

        private String state;
        private String district;
        private String village;

        @NotNull(message = "Role is required")
        private Role role;

        public String getName()     { return name; }
        public String getEmail()    { return email; }
        public String getPassword() { return password; }
        public String getPhone()    { return phone; }
        public String getState()    { return state; }
        public String getDistrict() { return district; }
        public String getVillage()  { return village; }
        public Role getRole()       { return role; }

        public void setName(String v)     { this.name     = v; }
        public void setEmail(String v)    { this.email    = v; }
        public void setPassword(String v) { this.password = v; }
        public void setPhone(String v)    { this.phone    = v; }
        public void setState(String v)    { this.state    = v; }
        public void setDistrict(String v) { this.district = v; }
        public void setVillage(String v)  { this.village  = v; }
        public void setRole(Role v)       { this.role     = v; }
    }

    public static class Login {
        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;

        public String getEmail()    { return email; }
        public String getPassword() { return password; }

        public void setEmail(String v)    { this.email    = v; }
        public void setPassword(String v) { this.password = v; }
    }
}
