package com.sit.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SitPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(SitPortalApplication.class, args);
    }
}
