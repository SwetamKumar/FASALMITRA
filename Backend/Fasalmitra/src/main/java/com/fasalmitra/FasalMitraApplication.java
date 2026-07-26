package com.fasalmitra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FasalMitraApplication {
    public static void main(String[] args) {
        SpringApplication.run(FasalMitraApplication.class, args);
    }
}
